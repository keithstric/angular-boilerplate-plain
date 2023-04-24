import {Injectable} from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {HttpCacheService} from '@core/services/http-cache/http-cache.service';
import {Logger} from '@core/services/logger/logger';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {LoadingService} from '@layout/services/loading/loading.service';

/**
 * Intercept all http requests
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpRequestInterceptor {

	constructor(
		private _loading: LoadingService,
		private _cache: HttpCacheService
	) {}

	/**
	 * When an http request starts, set loading to true. When the request is finished, set loading to false.
	 * If an error is thrown be sure loading is set to false.
	 * @param {HttpRequest} request
	 * @param {HttpHandler} next
	 * @returns {Observable<HttpEvent<any>>}
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this._loading.setLoading(true, request);
		let cachedResponse;
		if (request.method === 'GET') {
			cachedResponse = this._cache.get(request);
			if (cachedResponse) {
				Logger.debug(`[HttpRequestInterceptor.intercept] Response from cache for ${request.urlWithParams}`, cachedResponse);
				this._loading.setLoading(false, request);
				// Just return cached response and DO NOT make a network request
				return of<HttpEvent<any>>(cachedResponse);
			}
		}else if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH' || request.method === 'DELETE') {
			const removedFromCache = this._cache.delete(request);
			if (removedFromCache) {
				Logger.debug(`[HttpRequestInterceptor.intercept] Cleared ${request.urlWithParams} from the cache`);
			}
		}
		return next.handle(request)
			.pipe(
				tap<HttpEvent<any>>((httpEvent: HttpEvent<any>) => {
					if (httpEvent instanceof HttpResponse) {
						this._cache.put(request, httpEvent);
					}
					return cachedResponse ? cachedResponse : httpEvent;
				}),
				catchError((err: HttpErrorResponse) => {
					throw err;
				}),
				finalize(() => {
					this._loading.setLoading(false, request);
				})
			);
	}
}


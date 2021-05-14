import {Injectable} from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';
import {LoadingService} from '@layout/services/loading/loading.service';

/**
 * Intercept all http requests
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpRequestInterceptor {

	constructor(
		private _loading: LoadingService,
		private _error: AppErrorHandler
	) { }

	/**
	 * When an http request starts, set loading to true. When the request is finished, set loading to false.
	 * If an error is thrown be sure loading is set to false.
	 * @param {HttpRequest} request
	 * @param {HttpHandler} next
	 * @returns {Observable<HttpEvent<any>>}
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this._loading.setLoading(true, request);
		return next.handle(request)
			.pipe(
				tap<HttpEvent<any>>((httpEvent: HttpEvent<any>) => {
					if (httpEvent instanceof HttpResponse) {
						this._loading.setLoading(false, request);
					}
					return httpEvent;
				}),
				catchError((err: HttpErrorResponse) => {
					this._loading.setLoading(false, request);
					return this._error.handleResponseError(err);
				}),
				finalize(() => {
					this._loading.setLoading(false, request);
				})
			);
	}
}


import {Injectable} from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from '@core/services/error/error.service';
import {LoadingService} from '../../layout/services/loading/loading.service';

/**
 * Intercept all http requests
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpRequestInterceptor {

	constructor(
		private _loading: LoadingService,
		private _error: ErrorService
	) { }

	/**
	 * When an http request starts, set loading to true. When the request is finished, set loading to false.
	 * If an error is thrown be sure loading is set to false.
	 * @param request
	 * @param next
	 * @returns {Observable<HttpEvent<any>>}
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this._loading.setLoading(true, request.url);
		return next.handle(request)
			.pipe(catchError((err: HttpErrorResponse) => {
				this._loading.setLoading(false, request.url);
				return this._error.handleResponseError(err);
			}))
			.pipe(tap<HttpEvent<any>>((httpEvent: HttpEvent<any>) => {
				if (httpEvent instanceof HttpResponse) {
					this._loading.setLoading(false, request.url);
				}
				return httpEvent;
			}));
	}
}


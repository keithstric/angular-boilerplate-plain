import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LoggerService} from '@core/services/logger/logger.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiEndpoints, ApiMethod, ApiRouteToClass} from '@core/interfaces/api.interface';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';

/**
 * This service is for handling all http requests and responses. If an error occurs, handle the error.
 * If the request route is defined in @link {ApiRouteToClass} will automatically deserialize the Raw object
 * into it's respective class.
 */
@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(
		private _http: HttpClient,
		private _error: AppErrorHandler,
		private _router: Router,
		private logger: LoggerService
	) {}

	/**
	 * Make an http request
	 * @param apiUrl {ApiEndpoints | string}
	 * @param method {ApiMethod}
	 * @param data {any}
	 * @returns {Observable<any>}
	 */
	requestCall(apiUrl: ApiEndpoints | string, method: ApiMethod, data?: any) {
		let response: Observable<any>;
		let reqObservable: Observable<any>;
		switch (method) {
			case ApiMethod.GET:
				reqObservable = this._http.get(apiUrl);
				break;
			case ApiMethod.DELETE:
				reqObservable = this._http.delete(apiUrl);
				break;
			case ApiMethod.PATCH:
				reqObservable = this._http.patch(apiUrl, data);
				break;
			case ApiMethod.POST:
				reqObservable = this._http.post(apiUrl, data);
				break;
			case ApiMethod.PUT:
				reqObservable = this._http.put(apiUrl, data);
				break;
		}
		response = reqObservable
			.pipe(
				map((resp: HttpResponse<any>) => { // Convert our raw object to a class instance
					const clazz = this.getRouteClass(apiUrl);
					if (clazz) {
						if (Array.isArray(resp)) {
							return resp.map(item => clazz.deserialize(item));
						} else {
							return clazz.deserialize(resp);
						}
					}
					return resp;
				}),
				catchError((err: HttpErrorResponse) => this.handleError(err, this))
			);
		return response;
	}

	/**
	 * Handle any errors that occur during the request
	 * @param error {HttpErrorResponse}
	 * @param self {HttpService}
	 * @returns {Observable<never>}
	 */
	handleError(error: HttpErrorResponse, self: HttpService) {
		if (error.error instanceof ErrorEvent) {
			// console.error(`An error occurred: ${error.error.message}`);
			this.logger.error(error.error.message, error);
		} else {
			if (error.status === 401) {
				this._router.navigateByUrl('/auth/login');
			}
			this.logger.error(error.message, error);
			return this._error.handleRequestError(error.status, error.error.message, error.error);
		}
	}

	/**
	 * Assumes an apiUrl like "/api/<something>/..." that matches
	 * @param {string} apiUrl
	 * @returns {Class | undefined}
	 * @link {ApiRouteToClass}
	 */
	getRouteClass(apiUrl: string) {
		let clazz;
		if (apiUrl) {
			const pathKey = apiUrl.split('/')
				.filter(Boolean) // remove empty string/null/undefined items
				.slice(0, 2) // remove everything past the 2nd path part (i.e. '/api/auth/<remove>/<everything>/<else>
				.join('/'); // Put it all back together
			clazz = ApiRouteToClass[`/${pathKey}`] || undefined;
		}
		return clazz;
	}
}

import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiMethod, ApiRouteToClass} from '@core/interfaces/api.interface';
import {HttpRequestConfig} from '@core/services/http/http.interface';
import {Logger} from '@core/services/logger/logger';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';

/**
 * This service is for handling all http requests and responses. If an error occurs, handle the error.
 * If the request route is defined in {@link ApiRouteToClass} will automatically deserialize the Raw object
 * into it's respective class.
 */
@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(
		private _http: HttpClient,
		private _error: AppErrorHandler,
		private _router: Router
	) {}

	/**
	 * Make an http request
	 * @param apiUrl {ApiEndpoints | string}
	 * @param method {ApiMethod}
	 * @param body {any}
	 * @param config
	 * @returns {Observable<any>}
	 */
	doRequest(apiUrl: string, method: ApiMethod, body?: any, config?: HttpRequestConfig) {
		let response: Observable<any>;
		let reqObservable: Observable<any>;
		if (method === ApiMethod.GET || method === ApiMethod.DELETE) {
			if (!config && body) {
				config = {observe: body};
			}else if (config && body) {
				config.observe = body;
			}
		}
		switch (method) {
			case ApiMethod.GET:
				reqObservable = this._http.get(apiUrl, config);
				break;
			case ApiMethod.DELETE:
				reqObservable = this._http.delete(apiUrl, config);
				break;
			case ApiMethod.PATCH:
				reqObservable = this._http.patch(apiUrl, body, config);
				break;
			case ApiMethod.POST:
				reqObservable = this._http.post(apiUrl, body, config);
				break;
			case ApiMethod.PUT:
				reqObservable = this._http.put(apiUrl, body, config);
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
				catchError((err: HttpErrorResponse) => {
					throw err;
				})
			);
		return response;
	}

	/**
	 * Assumes an apiUrl like "/api/something/..." that matches
	 * @param {string} apiUrl
	 * @returns {Class | undefined}
	 * {@link ApiRouteToClass}
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

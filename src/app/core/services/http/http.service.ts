import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiEndpoints, ApiMethod, ApiRouteToClass} from '@core/interfaces/api.interface';
import {ErrorService} from '@core/services//error/error.service';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(
		private _http: HttpClient,
		private _error: ErrorService,
		private _router: Router
	) {
	}

	/**
	 * Make an http request
	 * @param apiUrl {ApiEndpoints | string}
	 * @param method {ApiMethod}
	 * @param data {any}
	 * @returns {Observable<any>}
	 */
	requestCall(apiUrl: ApiEndpoints | string, method: ApiMethod, data?: any) {
		// console.log('HttpService.requestCall, apiUrl=', apiUrl);
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
			.pipe(catchError((err) => this.handleError(err, this)))
			.pipe(map((resp) => { // Convert our raw object to a class instance
				const clazz = this.getRouteClass(apiUrl);
				if (clazz) {
					if (Array.isArray(resp)) {
						return resp.map(item => clazz.deserialize(item));
					} else {
						return clazz.deserialize(resp);
					}
				}
				return resp;
			}));
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
			console.error(`An error occurred: ${error.error.message}`);
		} else {
			if (error.status === 401) {
				this._router.navigateByUrl('/auth/login');
			}
			return this._error.handleRequestError(error.status, error.error.message, error.error);
		}
	}

	/**
	 * Assumes an apiUrl like "/api/<something>/..." that matches
	 * @param {string} apiUrl
	 * @returns {Class | undefined}
	 */
	getRouteClass(apiUrl: string) {
		let clazz;
		if (apiUrl) {
			const pathKey = apiUrl.split('/')
				.filter(Boolean)
				.slice(0, 2)
				.join('/');
			clazz = ApiRouteToClass[`/${pathKey}`] || undefined;
		}
		return clazz;
	}
}

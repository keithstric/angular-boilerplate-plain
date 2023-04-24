import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CachableRoutePatterns} from '@core/interfaces/api.interface';
import {LocalStorageTypes} from '@core/services/local-storage/local-storage.interface';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {Logger} from '@core/services/logger/logger';
import * as Route from 'route-parser';

abstract class HttpCache {
	abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
	abstract put(req: HttpRequest<any>, res: HttpResponse<any>): void;
	abstract delete(req: HttpRequest<any>): boolean;
}

@Injectable({
	providedIn: 'root'
})
export class HttpCacheService implements HttpCache {
	cache: { [key: string]: HttpResponse<any> } = {};
	cachableRoutes = CachableRoutePatterns;

	constructor() {
		Logger.debug(`HttpCacheService constructed for:\n ${Object.keys(this.cachableRoutes).join(',\n')}`);
	}

	/**
	 * Get an item from the cache
	 * @param req
	 */
	get(req: HttpRequest<any>): HttpResponse<any> {
		return this.shouldCacheToSessionStorage(req.urlWithParams)
			? LocalStorageService.getItem(LocalStorageTypes.SESSION, req.urlWithParams)
			: this.cache[req.urlWithParams];
	}

	/**
	 * Put an item in the cache
	 * @param req
	 * @param res
	 */
	put(req: HttpRequest<any>, res: HttpResponse<any>): void {
		const shouldCache = this.shouldCache(req.urlWithParams);
		const shouldCacheToSessionStorage = this.shouldCacheToSessionStorage(req.urlWithParams);
		if (shouldCache && shouldCacheToSessionStorage) {
			this.cacheToSessionStorage(req.urlWithParams, res);
		}else if (shouldCache) {
			this.cacheToLocal(req.urlWithParams, res);
		}
	}

	/**
	 * Delete an item from the cache
	 * @param req
	 */
	delete(req: HttpRequest<any>): boolean {
		const cachedRequest = this.get(req);
		const shouldCacheToSessionStorage = this.shouldCacheToSessionStorage(req.urlWithParams);
		let returnVal = false;
		if (shouldCacheToSessionStorage && cachedRequest) {
			LocalStorageService.removeItem(LocalStorageTypes.SESSION, req.urlWithParams);
			returnVal = true;
		}else if (cachedRequest) {
			delete this.cache[req.urlWithParams];
			returnVal = true;
		}
		return returnVal;
	}

	/**
	 * Determine if a url SHOULD be cached or not. It must match a route pattern provided in
	 * @link(CachableRoutePatterns)
	 *
	 * @param urlWithParams
	 */
	shouldCache(urlWithParams: string) {
		let shouldCache = false;
		Object.keys(this.cachableRoutes).forEach((pattern) => {
			const route = new Route(pattern);
			const routeMatch = route.match(urlWithParams);
			if (routeMatch) {
				shouldCache = !!routeMatch;
			}
		});
		return shouldCache;
	}

	/**
	 * Determine if a url SHOUlD be placed in sessionStorage or not. It must match a route pattern provided in
	 * @link(CachableRoutePatterns) AND the item in CachableRoutePatterns must have a value of `true`
	 *
	 * @param urlWithParams
	 */
	shouldCacheToSessionStorage(urlWithParams: string) {
		let shouldCache = false;
		Object.keys(this.cachableRoutes).forEach((pattern) => {
			const route = new Route(pattern);
			const routeMatch = route.match(urlWithParams);
			if (routeMatch && this.cachableRoutes[pattern] === true) {
				shouldCache = !!routeMatch;
			}
		});
		return shouldCache;
	}

	/**
	 * Place the response in the local `cache` variable
	 *
	 * @param urlWithParams
	 * @param res
	 */
	cacheToLocal(urlWithParams: string, res: HttpResponse<any>) {
		this.cache[urlWithParams] = res;
	}

	/**
	 * Place the response in sessionStorage
	 * @param urlWithParams
	 * @param res
	 */
	cacheToSessionStorage(urlWithParams: string, res: HttpResponse<any>) {
		LocalStorageService.setItem(LocalStorageTypes.SESSION, urlWithParams, res);
	}
}

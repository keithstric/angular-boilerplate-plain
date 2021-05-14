import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CachableRoutePatterns} from '@core/interfaces/api.interface';
import {LocalStorageTypes} from '@core/interfaces/local-storage.interface';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {Logger} from '@core/services/logger/logger';
import * as Route from 'route-parser';

abstract class HttpCache {
	abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
	abstract put(req: HttpRequest<any>, res: HttpResponse<any>): void;
}

@Injectable({
	providedIn: 'root'
})
export class HttpCacheService implements HttpCache {
	cache: { [key: string]: HttpResponse<any> } = {};
	cachableRoutes = CachableRoutePatterns;

	constructor() {
		Logger.debug(`HttpCacheService constructed for ${Object.keys(this.cachableRoutes).join(',\n')}`);
	}

	get(req: HttpRequest<any>): HttpResponse<any> {
		const cachedItem = this.shouldCacheToSessionStorage(req.urlWithParams)
			? LocalStorageService.getItem(LocalStorageTypes.SESSION, req.urlWithParams)
			: this.cache[req.urlWithParams];
		if (cachedItem) {
			return cachedItem;
		}
	}

	put(req: HttpRequest<any>, res: HttpResponse<any>): void {
		const shouldCache = this.shouldCache(req.urlWithParams);
		const shouldCacheToSessionStorage = this.shouldCacheToSessionStorage(req.urlWithParams);
		if (shouldCache && shouldCacheToSessionStorage) {
			this.cacheToSessionStorage(req.urlWithParams, res);
		}else if (shouldCache) {
			this.cacheToLocal(req.urlWithParams, res);
		}
	}

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

	shouldCache(urlWithParams: string) {
		let shouldCache = false;
		Object.keys(this.cachableRoutes).forEach((pattern) => {
			const route = new Route(pattern);
			const routeMatch = route.match(urlWithParams);
			if (routeMatch) {
				shouldCache = !!routeMatch;
			}else {
				if (pattern === urlWithParams) {
					shouldCache = true;
				}
			}
		});
		console.log('shouldCache=', shouldCache);
		return shouldCache;
	}

	shouldCacheToSessionStorage(urlWithParams: string) {
		return this.cachableRoutes[urlWithParams] === true;
	}

	cacheToLocal(urlWithParams: string, res: HttpResponse<any>) {
		this.cache[urlWithParams] = res;
	}

	cacheToSessionStorage(urlWithParams: string, res: HttpResponse<any>) {
		LocalStorageService.setItem(LocalStorageTypes.SESSION, urlWithParams, res);
	}
}

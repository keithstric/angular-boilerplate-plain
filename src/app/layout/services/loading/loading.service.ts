import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * This service is for managing the state of a loading spinner
 */
@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	loadingMap: Map<string, boolean> = new Map<string, boolean>();

	constructor() {
	}

	/**
	 * This method is only called from the @link(HttpRequestInterceptor)
	 * @param loading {boolean}
	 * @param url {string}
	 */
	setLoading(loading: boolean, url: string) {
		if (loading === true) {
			this.loadingMap.set(url, loading);
			this.loadingSub.next(true);
		} else if (loading === false && this.loadingMap.has(url)) {
			this.loadingMap.delete(url);
			if (this.loadingMap.size === 0) {
				this.loadingSub.next(false);
			}
		}
	}
}

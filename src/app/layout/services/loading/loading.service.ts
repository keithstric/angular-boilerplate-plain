import {HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SetLoadingAction} from '@core/root-store/loading/loading.action';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';

/**
 * This service is for managing the state of a loading spinner
 */
@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	loadingMap: Map<HttpRequest<any>, boolean> = new Map<HttpRequest<any>, boolean>();

	constructor(
		private store: Store<{loading: boolean}>
	) {}

	/**
	 * This method is only called from the @link(HttpRequestInterceptor)
	 * @param loading {boolean}
	 * @param request {string}
	 */
	setLoading(loading: boolean, request: HttpRequest<any>) {
		if (loading === true) {
			this.loadingMap.set(request, loading);
			this.loadingSub.next(true);
			this.store.dispatch(new SetLoadingAction(true));
		} else if (loading === false && this.loadingMap.has(request)) {
			this.loadingMap.delete(request);
			if (this.loadingMap.size === 0) {
				this.loadingSub.next(false);
				this.store.dispatch(new SetLoadingAction(false));
			}
		}
	}
}

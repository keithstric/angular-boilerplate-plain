import {HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SetLoadingAction} from '@core/root-store/loading/loading.action';
import {Store} from '@ngrx/store';

/**
 * This service is for managing the state of a loading spinner
 */
@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	loadingMap: Map<HttpRequest<any>, boolean> = new Map<HttpRequest<any>, boolean>();

	constructor(
		private store: Store<{loading: boolean}>
	) {}

	/**
	 * This method is only called from the {@link HttpRequestInterceptor}
	 * We can't just dispatch the action with the value of the loading argument, we
	 * must ensure that there are no pending requests still loading in the loadingMap
	 * @param loading {boolean}
	 * @param request {string}
	 */
	setLoading(loading: boolean, request: HttpRequest<any>) {
		if (loading === true) {
			this.loadingMap.set(request, loading);
			this.store.dispatch(new SetLoadingAction(true));
		} else if (loading === false && this.loadingMap.has(request)) {
			this.loadingMap.delete(request);
			if (this.loadingMap.size === 0) {
				this.store.dispatch(new SetLoadingAction(false));
			}
		}
	}
}

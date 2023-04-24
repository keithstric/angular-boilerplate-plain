import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RouterStateUrl} from '@core/root-store/models/app-state.model';
import {RouterReducerState} from '@ngrx/router-store';
import {Store} from '@ngrx/store';
import * as fromRoot from '@core/root-store';
import {pairwise} from 'rxjs/operators';

export interface iFromToRouterHistory {
	from: RouterReducerState<RouterStateUrl>;
	to: RouterReducerState<RouterStateUrl>;
}

/**
 * Maintain a history of navigation events and provide helper methods
 * for differentiating between view changes and page changes. To determine
 * the difference we're assuming that a view change will be via query params
 * and that a page will not have any query params
 */
@Injectable({
	providedIn: 'root'
})
export class RouterStateService {
	private _navigationHistory: RouterReducerState<RouterStateUrl>[] = [];
	private _fromToHistory: iFromToRouterHistory[] = [];
	private _pageHistory: RouterReducerState<RouterStateUrl>[] = [];

	constructor(
		private _router: Router,
		private store: Store<{router}>
	) {
		this._listenToStore();
	}

	/**
	 * Listen to the router state to populate history information
	 * @private
	 */
	private _listenToStore() {
		this.store.select(fromRoot.selectRouterState)
			.pipe(
				pairwise()
			)
			.subscribe(([oldRoute, newRoute]) => {
				this._fromToHistory = [...this._fromToHistory, {from: oldRoute, to: newRoute}];
				this._navigationHistory = [...this._navigationHistory, newRoute];
				if (!Object.keys(newRoute.state.queryParams).length) {
					this._pageHistory = [...this._pageHistory, newRoute];
				}
				this.doCleanup();
			});
	}

	/**
	 * Clean up the history items. We want to only keep what is necessary.
	 * Once we get 27 items in any of the history arrays we want to remove the first
	 * 25 items leaving the current and previous history items
	 */
	doCleanup() {
		if (this._fromToHistory.length > 26) {
			this._fromToHistory.splice(0, 25);
		}
		if (this._pageHistory.length > 26) {
			this._pageHistory.splice(0, 25);
		}
		if (this._navigationHistory.length > 26) {
			this._navigationHistory.splice(0, 25);
		}
	}

	/**
	 * An array of router states as the user navigates. Mimics history
	 */
	get navigationHistory() {
		return this._navigationHistory;
	}

	/**
	 * Array of urls the user navigated to
	 */
	get navigationUrlHistory() {
		return this._navigationHistory.map(routerState => routerState.state.url);
	}

	/**
	 * Array of page router states the user has navigated to
	 */
	get pageHistory() {
		return this._pageHistory;
	}

	/**
	 * Array of page urls the user has navigated to
	 */
	get pageUrlHistory() {
		return this._pageHistory.map(routerState => routerState.state.url);
	}

	/**
	 * Array of navigations that shows where a user navigated from and where they
	 * navigated to
	 */
	get fromToHistory() {
		return this._fromToHistory;
	}

	/**
	 * Array of navigations that shows the URLs where a user navigated from and where they
	 * navigated to
	 */
	get fromToUrlHistory() {
		return this._fromToHistory.map(historyState => ({from: historyState.from?.state.url, to: historyState.to?.state.url}));
	}

	/**
	 * Get the user's previous URL
	 */
	get previousUrl() {
		if (this._fromToHistory.length) {
			return this._fromToHistory[this._fromToHistory.length - 1].from?.state.url;
		}
		return undefined;
	}

	/**
	 * Get the user's previous Page URL
	 */
	get previousPageUrl() {
		if (this._pageHistory.length) {
			let prevPageUrl = this._pageHistory[this._pageHistory.length - 1]?.state.url;
			if (prevPageUrl === this.currentPageUrl) {
				prevPageUrl = this._pageHistory[this._pageHistory.length - 2]?.state.url;
			}
			return prevPageUrl;
		}
		return undefined;
	}

	/**
	 * Get the current user parameters
	 */
	get currentQueryParams() {
		const navHistory = this.navigationHistory;
		const currentPageState = navHistory[navHistory.length - 1];
		return currentPageState.state.queryParams;
	}

	/**
	 * Get the current full url
	 */
	get currentUrl() {
		const navHistory = this.navigationHistory;
		const currState = navHistory[navHistory.length - 1];
		return currState.state.url;
	}

	/**
	 * Get the current page url (no query parameters included)
	 */
	get currentPageUrl() {
		const currPageUrl = this.currentUrl.split('?');
		return currPageUrl[0];
	}
}

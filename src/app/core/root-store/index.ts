import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppState, iUserState, RouterStateUrl} from '@core/root-store/models/app-state.model';

import * as fromRouter from '@ngrx/router-store';
import * as fromUser from '@core/root-store/user';
import * as fromLoading from '@core/root-store/loading';
import * as fromForms from '@core/root-store/forms';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

/**
 * A map of reducers. Use this instead of defining them in the module
 */
export const reducers: ActionReducerMap<AppState> = {
	user: fromUser.UserReducer,
	loading: fromLoading.LoadingReducer,
	router: fromRouter.routerReducer,
	forms: fromForms.formsReducer
};

// root feature selectors
export const selectUserFeatureState = createFeatureSelector<iUserState>('user');
export const selectLoadingFeatureState = createFeatureSelector<boolean>('loading');

/**
 * The @ngrx/router-store state feature selector
 */
export const selectRouterState = createFeatureSelector<
	fromRouter.RouterReducerState<RouterStateUrl>
	>('router');
export const selectRouterUrl = createSelector(
	selectRouterState,
	(routerState) => routerState.state.url
);
export const selectRouterParams = createSelector(
	selectRouterState,
	(routerState) => routerState.state.params
);
export const selectRouterQueryParams = createSelector(
	selectRouterState,
	(routerState) => routerState.state.queryParams
);

/**
 * This is a custom serializer for @ngrx/router-store. It builds the state object to include
 * params, queryParams from the url. More properties can be added here
 */
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		const {url} = routerState;
		const {queryParams} = routerState.root;
		let state: ActivatedRouteSnapshot = routerState.root;
		while (state.firstChild) {
			state = state.firstChild;
		}
		const {params} = state;
		return {url, queryParams, params};
	}
}

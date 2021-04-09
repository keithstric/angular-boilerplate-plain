import {LoadingAction, LoadingActionTypes} from '@core/root-store/loading/loading.action';

export function LoadingReducer(state: boolean = false, action: LoadingAction) {
	switch (action.type) {
		case LoadingActionTypes.SET_LOADING:
			return action.payload;
	}
	return state;
}

export const getLoading = (state: boolean) => state;

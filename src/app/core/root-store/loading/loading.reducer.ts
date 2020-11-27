import {iRootState} from '@core/root-store/models/app-state.model';
import {LoadingAction, LoadingActionTypes} from '@core/root-store/loading/loading.action';

export function LoadingReducer(state: boolean = false, action: LoadingAction) {
	switch (action.type) {
		case LoadingActionTypes.SET_LOADING:
			return action.payload;
	}
	return state;
}

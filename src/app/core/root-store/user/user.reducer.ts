import {LocalStorageTypes} from '@core/services/local-storage/local-storage.interface';
import {iUserState} from '@core/root-store/models/app-state.model';
import {UserAction, UserActionTypes} from '@core/root-store/user/user.action';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {ActionReducer} from '@ngrx/store';

export const initialUserState: iUserState = {
	data: null,
	loading: false,
	error: undefined
};

export function UserReducer(state: iUserState = initialUserState, action: UserAction) {
	switch (action.type) {
		case UserActionTypes.LOGIN_USER_SUCCESS:
			return {...state, data: action.payload, loading: false, error: undefined};
		case UserActionTypes.LOGIN_USER_FAILURE:
			return {...state, data: null, loading: false, error: action.payload};
		case UserActionTypes.LOGOUT_USER_SUCCESS:
			return {...state, data: null, loading: false, error: undefined};
		case UserActionTypes.LOGOUT_USER_FAILURE:
			return {...state, data: null, loading: false, error: action.payload};
		case UserActionTypes.REGISTER_USER_SUCCESS:
			return {...state, data: action.payload, loading: false, error: undefined};
		case UserActionTypes.REGISTER_USER_FAILURE:
			return {...state, data: null, loading: false, error: action.payload};
		case UserActionTypes.CHANGE_PASSWORD_SUCCESS:
			return {...state, data: action.payload, loading: false, error: undefined};
		case UserActionTypes.CHANGE_PASSWORD_FAILURE:
			return {...state, error: action.payload};
	}
	return state;
}

/*
* User selectors
*/
export const getUser = (state: iUserState) => state.data;
export const getUserLoaded = (state: iUserState) => state.loaded;
export const getUserLoading = (state: iUserState) => state.loading;
export const getUserFullName = (state: iUserState) => state.data.fullName;
export const getUserLastName = (state: iUserState) => state.data.last_name;
export const getUserFirstName = (state: iUserState) => state.data.first_name;
export const getUserEmail = (state: iUserState) => state.data.email;
export const getUserAvatar = (state: iUserState) => state.data.avatar;

/**
 * Get user from local storage and update the state
 * @param reducer
 */
export function UserFromStorageMetaReducer(reducer: ActionReducer<any>) {
	return (state, action) => {
		let newState = state ? {...state} : state;
		if (state && state.user) {
			const user = LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user');
			if (user) {
				const userState: iUserState = {data: user, loading: false, error: undefined};
				newState = {...newState, user: userState};
			}
		}
		return reducer(newState, action);
	};
}

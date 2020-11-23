import {UserAction, UserActionTypes} from '@core/root-store/user/user.action';
import {User} from '@shared/models/user.model';

export interface iFeatureState {
	data: any;
	loading: boolean;
	error: Error | null;
}

export interface iUserState extends iFeatureState {
	data: User | null;
}

export const initialState: iUserState = {
	data: null,
	loading: false,
	error: undefined
};

export function UserReducer(state: iUserState = initialState, action: UserAction) {
	switch (action.type) {
		case UserActionTypes.LOGIN_USER_SUCCESS:
			const loginUser = User.deserialize(action.payload);
			return {...state, data: loginUser, loading: false, error: undefined};
		case UserActionTypes.LOGIN_USER_FAILURE:
			return {...state, data: null, loading: false, error: action.payload};
		case UserActionTypes.LOGOUT_USER_SUCCESS:
			return {...state, data: null, loading: false, error: undefined};
		case UserActionTypes.LOGOUT_USER_FAILURE:
			return {...state, data: null, loading: false, error: action.payload};
		case UserActionTypes.REGISTER_USER_SUCCESS:
			const registerUser = User.deserialize(action.payload);
			return {...state, data: registerUser, loading: false, error: undefined};
		case UserActionTypes.REGISTER_USER_FAILURE:
			return {...state, data: null, loading: false, error: action.payload};
	}
	return state;
}

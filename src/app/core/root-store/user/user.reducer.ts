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
	error: null
};

export function UserReducer(state: iUserState = initialState, action: UserAction) {
	switch (action.type) {
		// handled by UserEffects
		// case UserActionTypes.LOGIN_USER:
		// 	console.log('UserReducer, LOGIN_USER action.payload=', action.payload);
		// 	return {...state, data: action.payload, loading: true};
		case UserActionTypes.LOGIN_USER_SUCCESS:
			console.log('UserReducer, LOGIN_USER_SUCCESS action.payload=', action.payload);
			const user = User.deserialize(action.payload);
			return {...state, data: user, loading: false};
		case UserActionTypes.LOGIN_USER_FAILURE:
			return {...state, data: null, loading: false};
	}
	return state;
}

import {UserAction, UserActionTypes} from '@core/root-store/user/user.action';
import {User} from '@shared/models/user.model';

const initialState: User = null;

export function UserReducer(state: User = initialState, action: UserAction) {
	switch (action.type) {
		case UserActionTypes.CREATE_USER:
			return action.payload;
		case UserActionTypes.UPDATE_USER:
			return action.payload;
		case UserActionTypes.GET_USER:
			// TODO - Think this will actually be an effect
		case UserActionTypes.DELETE_USER:
			return null;
		default:
			return state;
	}
}

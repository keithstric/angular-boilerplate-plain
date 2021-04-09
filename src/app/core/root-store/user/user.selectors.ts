import {selectUserFeatureState} from '@core/root-store';
import {iUserState} from '@core/root-store/models/app-state.model';
import {createSelector} from '@ngrx/store';
import * as fromUser from './user.reducer';


export const selectUserState = createSelector(
	selectUserFeatureState,
	(state: iUserState) => state
);

export const selectUser = createSelector(
	selectUserState,
	fromUser.getUser
);

export const selectUserLoaded = createSelector(
	selectUserState,
	fromUser.getUserLoaded
);

export const selectUserLoading = createSelector(
	selectUserState,
	fromUser.getUserLoading
);

export const selectUserFullName = createSelector(
	selectUser,
	(user) => user?.fullName
);

export const selectUserEmail = createSelector(
	selectUser,
	(user) => user?.email
);

export const selectUserFirstName = createSelector(
	selectUser,
	(user) => user?.first_name
);

export const selectUserLastName = createSelector(
	selectUser,
	(user) => user?.last_name
);

export const selectUserAvatar = createSelector(
	selectUser,
	(user) => user?.avatar
);

export const selectUserInitials = createSelector(
	selectUser,
	(user) => user?.initials
);

export const selectAvatarDependencies = createSelector(
	selectUserInitials,
	selectUserAvatar,
	selectUserEmail,
	(initials, userAvatar, emailAddress) => ({initials, userAvatar, emailAddress})
);

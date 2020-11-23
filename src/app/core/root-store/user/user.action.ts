import {Action} from '@ngrx/store';
import {RawUser, User} from '@shared/models/user.model';

export enum UserActionTypes {
	LOGIN_USER = '[USER] Login',
	LOGIN_USER_SUCCESS = '[USER] Login Success',
	LOGIN_USER_FAILURE = '[USER] Login Failure',
	LOGOUT_USER = '[USER] Logout',
	LOGOUT_USER_SUCCESS = '[USER] Logout Success',
	LOGOUT_USER_FAILURE = '[USER] Logout Failure',
	REGISTER_USER = '[USER] Register',
	REGISTER_USER_SUCCESS = '[USER] Register Success',
	REGISTER_USER_FAILURE = '[USER] Register Failure',
	CHANGE_PASSWORD = '[USER] Change Password',
	CHANGE_PASSWORD_SUCCESS = '[USER] Change Password Success',
	CHANGE_PASSWORD_FAILURE = '[USER] Change Password Failure'
}

export class LoginUserAction implements Action {
	readonly type = UserActionTypes.LOGIN_USER;
	constructor(public payload: RawUser) {}
}

export class LoginUserSuccessAction implements Action {
	readonly type = UserActionTypes.LOGIN_USER_SUCCESS;
	constructor(public payload: RawUser) {}
}

export class LoginUserFailureAction implements Action {
	readonly type = UserActionTypes.LOGIN_USER_FAILURE;
	constructor(public payload: Error) {}
}

export class LogOutUserAction implements Action {
	readonly type = UserActionTypes.LOGOUT_USER;
	constructor() {}
}

export class LogOutUserSuccessAction implements Action {
	readonly type = UserActionTypes.LOGOUT_USER_SUCCESS;
	constructor() {}
}

export class LogOutUserFailureAction implements Action {
	readonly type = UserActionTypes.LOGOUT_USER_FAILURE;
	constructor(public payload: Error) {}
}

export class RegisterUserAction implements Action {
	readonly type = UserActionTypes.REGISTER_USER;
	constructor(public payload: RawUser) {}
}

export class RegisterUserSuccessAction implements Action {
	readonly type = UserActionTypes.REGISTER_USER_SUCCESS;
	constructor(public payload: RawUser) {}
}

export class RegisterUserFailureAction implements Action {
	readonly type = UserActionTypes.REGISTER_USER_FAILURE;
	constructor(public payload: Error) {}
}

export class ChangeUserPasswordAction implements Action {
	readonly type = UserActionTypes.CHANGE_PASSWORD;
	constructor(public payload: RawUser) {}
}

export class ChangeUserPasswordSuccessAction implements Action {
	readonly type = UserActionTypes.CHANGE_PASSWORD_SUCCESS;
	constructor(public payload: RawUser) {}
}

export class ChangeUserPasswordFailureAction implements Action {
	readonly type = UserActionTypes.CHANGE_PASSWORD_FAILURE;
	constructor(public payload: Error) {}
}

export type UserAction = LoginUserAction
	| LoginUserSuccessAction
	| LoginUserFailureAction
	| LogOutUserAction
	| LogOutUserSuccessAction
	| LogOutUserFailureAction
	| RegisterUserAction
	| RegisterUserSuccessAction
	| RegisterUserFailureAction
	| ChangeUserPasswordAction
	| ChangeUserPasswordSuccessAction
	| ChangeUserPasswordFailureAction;


import {Action} from '@ngrx/store';
import {ChangeUserPassword, ForgotUserPassword, RawUser, User} from '@core/models/user.model';

export enum UserActionTypes {
	LOGIN_USER = '[USER] Login',
	LOGIN_USER_SUCCESS = '[USER Effect] Login Success',
	LOGIN_USER_FAILURE = '[USER Effect] Login Failure',
	LOGOUT_USER = '[USER] Logout',
	LOGOUT_USER_SUCCESS = '[USER Effect] Logout Success',
	LOGOUT_USER_FAILURE = '[USER Effect] Logout Failure',
	REGISTER_USER = '[USER] Register',
	REGISTER_USER_SUCCESS = '[USER Effect] Register Success',
	REGISTER_USER_FAILURE = '[USER Effect] Register Failure',
	CHANGE_PASSWORD = '[USER] Change Password',
	CHANGE_PASSWORD_SUCCESS = '[USER Effect] Change Password Success',
	CHANGE_PASSWORD_FAILURE = '[USER Effect] Change Password Failure',
	FORGOT_PASSWORD = '[USER] Forgot Password',
	FORGOT_PASSWORD_SUCCESS = '[USER Effect] Forgot Password Success',
	FORGOT_PASSWORD_FAILURE = '[USER Effect] Forgot Password Failure',
}

export class LoginUserAction implements Action {
	readonly type = UserActionTypes.LOGIN_USER;
	constructor(public payload: RawUser) {}
}

export class LoginUserSuccessAction implements Action {
	readonly type = UserActionTypes.LOGIN_USER_SUCCESS;
	constructor(public payload: User) {}
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
	constructor(public payload: User) {}
}

export class RegisterUserFailureAction implements Action {
	readonly type = UserActionTypes.REGISTER_USER_FAILURE;
	constructor(public payload: Error) {}
}

export class ChangeUserPasswordAction implements Action {
	readonly type = UserActionTypes.CHANGE_PASSWORD;
	constructor(public payload: ChangeUserPassword) {}
}

export class ChangeUserPasswordSuccessAction implements Action {
	readonly type = UserActionTypes.CHANGE_PASSWORD_SUCCESS;
	constructor(public payload: User) {}
}

export class ChangeUserPasswordFailureAction implements Action {
	readonly type = UserActionTypes.CHANGE_PASSWORD_FAILURE;
	constructor(public payload: Error) {}
}

export class ForgotUserPasswordAction implements Action {
	readonly type = UserActionTypes.FORGOT_PASSWORD;
	constructor(public payload: ForgotUserPassword) {}
}

export class ForgotUserPasswordSuccessAction implements Action {
	readonly type = UserActionTypes.FORGOT_PASSWORD_SUCCESS;
	constructor(public payload: User) {}
}

export class ForgotUserPasswordFailureAction implements Action {
	readonly type = UserActionTypes.FORGOT_PASSWORD_FAILURE;
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


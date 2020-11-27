import {Injectable} from '@angular/core';
import {
	ChangeUserPasswordAction,
	ChangeUserPasswordFailureAction,
	ChangeUserPasswordSuccessAction,
	ForgotUserPasswordAction, ForgotUserPasswordFailureAction,
	ForgotUserPasswordSuccessAction,
	LoginUserAction,
	LoginUserFailureAction,
	LoginUserSuccessAction,
	LogOutUserAction,
	LogOutUserFailureAction,
	LogOutUserSuccessAction,
	RegisterUserAction,
	RegisterUserFailureAction,
	RegisterUserSuccessAction,
	UserActionTypes
} from '@core/root-store/user/user.action';
import {AuthService} from '@core/services/auth/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class UserEffects {

	@Effect()
	loginUser = this.actions
		.pipe(
			ofType<LoginUserAction>(UserActionTypes.LOGIN_USER),
			mergeMap(action => this._auth.login(action.payload)
				.pipe(
					map(user => new LoginUserSuccessAction(user)),
					catchError(err => of(new LoginUserFailureAction(err)))
				)
			)
		);

	@Effect()
	logoutUser = this.actions
		.pipe(
			ofType<LogOutUserAction>(UserActionTypes.LOGOUT_USER),
			mergeMap(action => this._auth.logout()
				.pipe(
					map(() => new LogOutUserSuccessAction()),
					catchError(err => of(new LogOutUserFailureAction(err)))
				)
			)
		);

	@Effect()
	registerUser = this.actions
		.pipe(
			ofType<RegisterUserAction>(UserActionTypes.REGISTER_USER),
			mergeMap(action => this._auth.register(action.payload)
				.pipe(
					map(user => new RegisterUserSuccessAction(user)),
					catchError(err => of(new RegisterUserFailureAction(err)))
				)
			)
		);

	@Effect()
	changePw = this.actions
		.pipe(
			ofType<ChangeUserPasswordAction>(UserActionTypes.CHANGE_PASSWORD),
			mergeMap(action => this._auth.changePassword(action.payload)
				.pipe(
					map((rawUser) => new ChangeUserPasswordSuccessAction(rawUser)),
					catchError(err => of(new ChangeUserPasswordFailureAction(err)))
				)
			)
		);

	@Effect()
	forgotPw = this.actions
		.pipe(
			ofType<ForgotUserPasswordAction>(UserActionTypes.FORGOT_PASSWORD),
			mergeMap(action => this._auth.forgotPassword(action.payload)
				.pipe(
					map((rawUser) => new ForgotUserPasswordSuccessAction(rawUser)),
					catchError(err => of(new ForgotUserPasswordFailureAction(err)))
				)
			)
		);

	constructor(
		private actions: Actions,
		private _auth: AuthService
	) {}
}

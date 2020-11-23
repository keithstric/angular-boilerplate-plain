import {Injectable} from '@angular/core';
import {LoginUserAction, LoginUserSuccessAction, UserActionTypes} from '@core/root-store/user/user.action';
import {AuthService} from '@core/services/auth/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';

@Injectable()
export class UserEffects {

	@Effect()	loginUser = this.actions
		.pipe(
			ofType<LoginUserAction>(UserActionTypes.LOGIN_USER),
			mergeMap((action: LoginUserAction) => {
				console.log('createUser Effect, mergeMap, action=', action);
				return this._auth.login(action.payload)
					.pipe(
						tap((user) => {
							console.log('createUser Effect, map of network response, user=', user);
							return new LoginUserSuccessAction(user);
						}),
						catchError(err => of({type: UserActionTypes.LOGIN_USER_FAILURE, payload: err.error}))
					);
			})
		);

	constructor(
		private actions: Actions,
		private _auth: AuthService
	) { }
}

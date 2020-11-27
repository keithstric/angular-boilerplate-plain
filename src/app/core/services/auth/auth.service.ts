import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiEndpoints, ApiMethod} from '@core/interfaces/api.interface';
import {LocalStorageTypes} from '@core/interfaces/local-storage.interface';
import {ChangeUserPassword, RawUser, User} from '@core/models/user.model';
import {ErrorService} from '@core/services/error/error.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authData: BehaviorSubject<RawUser> = new BehaviorSubject<RawUser>(null);

	constructor(
		private _http: HttpService,
		private _error: ErrorService
	) {
	}

	/**
	 * Determine if current user is authenticated or not
	 * @returns {boolean}
	 */
	isAuthenticated() {
		return !!LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user');
	}

	/**
	 * Get the current user
	 * 2returns {User}
	 */
	getUser() {
		return User.deserialize(LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user'));
	}

	/**
	 * Get the current user's initials
	 * @returns {string}
	 */
	getUserInitials() {
		if (this.getUser()) {
			return this.getUser().initials;
		}
		return null;
	}

	/**
	 * Perform the login and store the returned user in sessionStorage
	 * @param loginData {RawUser}
	 * @returns {Observable<RawUser>}
	 */
	login(loginData: RawUser) {
		return this._http.requestCall(ApiEndpoints.LOGIN, ApiMethod.POST, loginData)
			.pipe(tap((rawUser: RawUser) => this.updateLocalUser(rawUser)));
	}

	/**
	 * Perform a logout and remove the current user from sessionStorage
	 * @returns {Observable<RawUser>}
	 */
	logout() {
		return this._http.requestCall(ApiEndpoints.LOGOUT, ApiMethod.GET)
			.pipe(tap((response) => {
				LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'user');
				this.authData.next(null);
				return response;
			}));
	}

	/**
	 * Perform a registration and store the returned user in sessionStorage
	 * @param {RawUser} registrationData
	 * @returns {Observable<RawUser>}
	 */
	register(registrationData) {
		return this._http.requestCall(ApiEndpoints.REGISTER, ApiMethod.POST, registrationData)
			.pipe(tap((rawUser: RawUser) => {
				return this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Change a user's password
	 * @param {RawUser} chgPwData
	 * @returns {Observable<RawUser>}
	 */
	changePassword(chgPwData: ChangeUserPassword) {
		return this._http.requestCall(ApiEndpoints.CHANGE_PW, ApiMethod.PUT, chgPwData)
			.pipe(tap((rawUser: RawUser) => {
				return this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Provide user a means to reset their password
	 * @param forgotPwData
	 * @return {Observable<RawUser>}
	 */
	forgotPassword(forgotPwData) {
		return this._http.requestCall(ApiEndpoints.FORGOT, ApiMethod.PUT, forgotPwData)
			.pipe(tap((rawUser: RawUser) => {
				this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * update a user's object in session storage
	 * @param rawUser
	 * @returns {User}
	 */
	updateLocalUser(rawUser: RawUser) {
		const user: User = User.deserialize(rawUser);
		LocalStorageService.setItem(LocalStorageTypes.SESSION, 'user', user);
		this.authData.next(user);
		return user;
	}
}

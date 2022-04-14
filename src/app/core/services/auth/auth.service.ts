import {Injectable} from '@angular/core';
import {Logger} from '@core/services/logger/logger';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiEndpoints, ApiMethod} from '@core/interfaces/api.interface';
import {LocalStorageTypes} from '@core/services/local-storage/local-storage.interface';
import {ChangeUserPassword, RawUser, User} from '@core/models/user.model';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authData: BehaviorSubject<RawUser> = new BehaviorSubject<RawUser>(null);

	constructor(
		private _http: HttpService,
		private _error: AppErrorHandler
	) {}

	/**
	 * Determine if current user is authenticated or not
	 * @returns {boolean}
	 */
	isAuthenticated() {
		return !!LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user');
	}

	/**
	 * Get the current user
	 * @returns {User}
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
	 * @returns {Observable<User>}
	 */
	login(loginData: RawUser) {
		return this._http.doRequest(ApiEndpoints.LOGIN, ApiMethod.POST, loginData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User Logged in', rawUser);
				this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Perform a logout and remove the current user from sessionStorage
	 * @returns {Observable<User>}
	 */
	logout() {
		return this._http.doRequest(ApiEndpoints.LOGOUT, ApiMethod.GET)
			.pipe(tap((response) => {
				Logger.info('User logged out', this.getUser());
				LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'user');
				this.authData.next(null);
				return response;
			}));
	}

	/**
	 * Perform a registration and store the returned user in sessionStorage
	 * @param {RawUser} registrationData
	 * @returns {Observable<User>}
	 */
	register(registrationData) {
		return this._http.doRequest(ApiEndpoints.REGISTER, ApiMethod.POST, registrationData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User registered', rawUser);
				return this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Change a user's password
	 * @param {RawUser} chgPwData
	 * @returns {Observable<User>}
	 */
	changePassword(chgPwData: ChangeUserPassword) {
		return this._http.doRequest(ApiEndpoints.CHANGE_PW, ApiMethod.PUT, chgPwData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User changed password', rawUser);
				return this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Provide user a means to reset their password
	 * @param forgotPwData
	 * @return {Observable<User>}
	 */
	forgotPassword(forgotPwData) {
		return this._http.doRequest(ApiEndpoints.FORGOT, ApiMethod.PUT, forgotPwData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User forgot password', rawUser);
				this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * update a user's object in session storage
	 * @param user
	 * @returns {User}
	 */
	updateLocalUser(user: User) {
		LocalStorageService.setItem(LocalStorageTypes.SESSION, 'user', user);
		this.authData.next(user);
		return user;
	}
}

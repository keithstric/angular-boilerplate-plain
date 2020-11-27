import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

/**
 * This guard is for checking if a user is authenticated or not. If not, then
 * redirect to the login page
 */
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private _auth: AuthService,
		private _router: Router
	) {}

	/**
	 * Determine if the active route can be activated or not. If not, redirect to login page
	 * @param next {ActivatedRouteSnapshot}
	 * @param state {RouterStateSnapshot}
	 * @returns {boolean}
	 */
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this._auth.isAuthenticated()) {
			return true;
		} else {
			this._router.navigateByUrl('/auth/login');
			return false;
		}
	}

}

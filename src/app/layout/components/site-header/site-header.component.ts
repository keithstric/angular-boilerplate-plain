import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {HeaderService} from '@layout/services/header/header.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-header',
	templateUrl: './site-header.component.html',
	styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
	title: string = PROJECT_NAME;
	user: any;
	subscriptions: Subscription = new Subscription();

	constructor(
		// private _header: HeaderService,
		private _storage: LocalStorageService,
		private _router: Router,
		private _http: HttpService,
		private _auth: AuthService
	) {	}

	ngOnInit(): void {
		this.listenToTitle();
		this.listenToAuth();
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Setup a listener for a title change
	 */
	private listenToTitle() {
		// this.subscriptions.add(this._header.currentHeaderTitleSub.subscribe((headerTitle: string) => {
		// 	this.title = headerTitle;
		// }));
	}

	/**
	 * Setup a listener for a user
	 */
	private listenToAuth() {
		this.subscriptions.add(this._auth.authData.subscribe((user) => {
			this.user = user;
		}));
	}

	/**
	 * Logout the current user
	 */
	logout() {
		this.subscriptions.add(this._auth.logout()
			.subscribe((args) => {
				this._router.navigateByUrl('/auth/login');
			}));
	}
}

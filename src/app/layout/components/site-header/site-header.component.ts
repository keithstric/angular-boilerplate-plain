import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {iUserState} from '@core/root-store/models/app-state.model';
import {LogOutUserAction} from '@core/root-store/user/user.action';
import {Store} from '@ngrx/store';
import {User} from '@shared/models/user.model';
import {Subscription} from 'rxjs';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
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
		private _storage: LocalStorageService,
		private _router: Router,
		private store: Store<{user: iUserState}>
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
		this.store.select(state => state.user.data)
			.subscribe((user: User) => {
				this.user = user;
			});
	}

	/**
	 * Logout the current user
	 */
	logout() {
		this.store.dispatch(new LogOutUserAction());
	}
}

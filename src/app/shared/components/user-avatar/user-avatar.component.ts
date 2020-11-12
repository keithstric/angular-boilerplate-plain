import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';

/**
 * A user avatar component
 * @class {UserAvatarComponent}
 */
@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit, OnDestroy {
	user: any;
	subscriptions: Subscription = new Subscription();
	initials: string;
	@Output() avatarClicked = new EventEmitter<any>();

	constructor(
		private _auth: AuthService
	) {
	}

	ngOnInit(): void {
		this.subscriptions.add(this._auth.authData.subscribe((user) => {
			this.user = user;
			this.initials = this._auth.getUserInitials();
		}));
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	/**
	 * emit the avatarClicked event
	 * @param evt
	 * @listens click#avatar-container
	 */
	avatarClick(evt: MouseEvent) {
		evt.stopPropagation();
		this.avatarClicked.emit(evt);
	}

}

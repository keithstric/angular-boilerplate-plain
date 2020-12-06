import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '@core/models/user.model';
import {iUserState} from '@core/root-store/models/app-state.model';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';
import * as tinycolor from 'tinycolor2';

/**
 * A user avatar component. Use the following classes to control the size in pixels:
 * small (32 x 32), medium (48 x 48), large (64 x 64), huge (120 x 120)
 * @class {UserAvatarComponent}
 *
 * @example
 *
 * <app-user-avatar [user]="user" class="small"></app-user-avatar>
 */
@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit, OnDestroy {
	user: User;
	subscriptions: Subscription = new Subscription();
	initials: string;
	backgroundColor: string = 'transparent';
	contrastingColor: string = 'white';
	@Output() avatarClicked = new EventEmitter<any>();

	constructor(
		private _auth: AuthService,
		private store: Store<{user: iUserState}>
	) {}

	ngOnInit(): void {
		this.subscriptions.add(this.store.select(store => store.user)
			.subscribe((user) => {
				this.user = user.data;
				if (this.user) {
					this.initials = this._auth.getUserInitials();
					this.backgroundColor = this.getBackgroundColor();
					this.contrastingColor = this.getContrastingColor(this.backgroundColor);
				}else{
					this.backgroundColor = 'transparent';
					this.contrastingColor = 'white';
				}
			})
		);
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

	/**
	 * Determine a background color for the avatar based on the email address
	 * @returns {string}
	 */
	getBackgroundColor() {
		let color = 'transparent';
		if (this.user) {
			let hash = 0;
			const {email} = this.user;
			for (let i = 0; i < email.length; i++) {
				hash = email.charCodeAt(i) + ((hash << 5) - hash);
			}
			color = '#';
			for (let j = 0; j < 3; j++) {
				const value = (hash >> (j * 8)) & 0xFF;
				const valueStr = value.toString(16);
				const hexColor = ('00' + valueStr).substr(-2);
				color += hexColor;
			}
		}
		return color;
	}

	/**
	 * Get a text color based on the background color
	 * @returns {string}
	 */
	getContrastingColor(color: string) {
		const tColor = tinycolor(color);
		return tColor.isDark() ? 'white' : 'black';
	}

}

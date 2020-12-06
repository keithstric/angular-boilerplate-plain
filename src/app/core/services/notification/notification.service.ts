import {Injectable} from '@angular/core';
import {SnackbarConfig} from '@shared/components/snack-bar/snack-bar.interface';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {ConfirmDialogData} from '@shared/components/confirm-modal/confirm-dialog-data.interface';

enum NotificationPermissions {
	GRANTED = 'granted',
	DENIED = 'denied',
	DEFAULT = 'default'
}

@Injectable()
export class NotificationService {

	constructor(
		private _snackbarRef: SnackBarRef
	) {}

	/**
	 * Show a snackbar/toast message
	 * @param config
	 */
	showSnackbar(config: SnackbarConfig) {
		this._snackbarRef.show(config);
	}

	/**
	 * Get permission to show notifications
	 * @returns {NotificationPermissions}
	 */
	async checkOSNotificationPermissions() {
		if (!('Notification' in window)) {
			throw new Error('Notifications are not supported');
		} else {
			return await Notification.requestPermission() as NotificationPermissions;
		}
	}

	/**
	 * Show an OS Notification
	 * @param title {string}
	 * @param body {string}
	 * @param icon {string}
	 * @param actions {NotificationAction[]}
	 */
	async showOsNotification(title: string, body: string, icon?: string, actions?: NotificationAction[]) {
		let notificationPermission = NotificationPermissions.DEFAULT;
		try {
			notificationPermission = await this.checkOSNotificationPermissions();
		} catch (err) {
			console.error(err);
		}
		if (notificationPermission === NotificationPermissions.GRANTED && title && body) {
			const timestamp = new Date().getTime();
			const swReg = await navigator.serviceWorker.getRegistration();
			if (swReg) {
				await swReg.showNotification(title, {body, icon, actions});
			}
		}
	}

	/**
	 * Show a confirmation dialog
	 *
	 * @example
	 * const ref = this._ui.showConfirmDialog({message: 'foo', title: 'bar'});
	 * // if you don't care about the result, you can omit this
	 * ref.afterOpen().subscribe(result => {console.log(result)});
	 *
	 * @param {ConfirmDialogData} dialogData
	 */
	showConfirmDialog(dialogData: ConfirmDialogData) {
		// return this._dialog.open(ConfirmDialogComponent, {data: dialogData});
	}
}

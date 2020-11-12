import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss, MatSnackBarRef} from '@angular/material/snack-bar';
import {SwPush} from '@angular/service-worker';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogData} from '@shared/interfaces/confirm-dialog-data.interface';

enum NotificationPermissions {
	GRANTED = 'granted',
	DENIED = 'denied',
	DEFAULT = 'default'
}

@Injectable({
	providedIn: 'root'
})
export class UiService {
	snackbarRef: MatSnackBarRef<any>;
	snackbarConfig: MatSnackBarConfig = {
		horizontalPosition: 'center',
		verticalPosition: 'bottom'
	};

	constructor(
		private _snackbar: MatSnackBar,
		private swPush: SwPush,
		private _dialog: MatDialog
	) { }

	/**
	 * Show a snackbar/toast message
	 * @param msg {string}
	 * @param duration {number}
	 * @param action {string}
	 * @param actionFn {Function}
	 */
	notifyUserShowSnackbar(msg: string, duration?: number, action?: string, actionFn?: (...args) => void): void {
		duration = duration ? duration : 3000;
		action = action || 'dismiss';
		this.snackbarRef = this._snackbar.open(msg, action, {...this.snackbarConfig, duration});
		const dismissSub = this.snackbarRef.afterDismissed()
			.subscribe((matSnackbarDismissedEvt: MatSnackBarDismiss) => {
				dismissSub.unsubscribe();
			});
		const actionSub = this.snackbarRef.onAction()
			.subscribe(() => {
				if (actionFn) {
					actionFn();
				}
				actionSub.unsubscribe();
			});
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
	 * @returns {MatDialogRef<ConfirmDialogComponent, ConfirmDialogData>}
	 */
	notifyUserShowConfirmDialog(dialogData: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent, ConfirmDialogData> {
		return this._dialog.open(ConfirmDialogComponent, {data: dialogData});
	}
}

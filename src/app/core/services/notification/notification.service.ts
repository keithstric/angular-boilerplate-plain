import {Injectable} from '@angular/core';
import {ServiceLocator} from '@core/services/service-locator';
import {ConfirmModalConfig} from '@shared/components/confirm-modal/confirm-modal.interface';
import {SnackbarConfig} from '@shared/components/snack-bar/snack-bar.interface';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';

enum NotificationPermissions {
	GRANTED = 'granted',
	DENIED = 'denied',
	DEFAULT = 'default'
}

@Injectable()
export class NotificationService {

	constructor() {}

	/**
	 * Show a snackbar/toast message
	 * @param config
	 */
	static showSnackbar(config: SnackbarConfig) {
		const snackbarRef = ServiceLocator.injector.get(SnackBarRef);
		snackbarRef.show(config);
	}

	/**
	 * Show a confirmation dialog
	 *
	 * @example
	 * const ref = this._ui.showConfirmDialog({message: 'foo', title: 'bar'});
	 * // if you don't care about the result, you can omit this
	 * ref.afterOpen().subscribe(result => {console.log(result)});
	 *
	 * @param modalConfig
	 */
	static showConfirmDialog(modalConfig: ConfirmModalConfig) {
		// const bsModalService = ServiceLocator.injector.get(BsModalService);
		// return bsModalService.show(ConfirmModalComponent, {initialState: modalConfig});
	}
}

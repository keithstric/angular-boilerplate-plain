import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';
import {Logger} from '@core/services/logger/logger';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackbarConfig, SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';
import {Subject, throwError} from 'rxjs';

/**
 * This service is for surfacing errors in the UI. By default, we'll notify the user with a snackbar (toast) message.
 * You should only need to include this service if you need to surface errors in the ui or need to notify the user
 * of errors.
 */
@Injectable({
	providedIn: 'root'
})
export class AppErrorHandler extends ErrorHandler {
	public errorEvent: Subject<Error> = new Subject<any>();

	constructor() {
		super();
	}

	/**
	 * Create a snackbar notification
	 * @param {number} notificationCode - An error code or Http Status
	 * @param {string} notification - The notification message
	 */
	notifyUserSnackbar(notificationCode: number, notification: string) {
		const snackbarConfig: SnackbarConfig = {
			message: `${notificationCode}: ${notification}`,
			duration: 5000,
			messageType: SnackbarMessageTypes.DANGER
		};
		NotificationService.showSnackbar(snackbarConfig);
	}

	/**
	 * This function is a global javascript error handler. It will catch all javascript errors
	 * produced within the application. The docs at https://angular.io/api/core/ErrorHandler say
	 * that err has a type of any. I'm assuming the "any" type is so you can pass it a custom error
	 * or error event. console logging the err argument just outputs the stack trace.
	 *
	 * If an error occurs within a try/catch block, this will not be fired unless you
	 * throw the error within the catch block.
	 *
	 * I understand I've got repeated code below, but this is merely a placeholder so that
	 * custom logic can be introduced based on the error type (err.name). You probably don't
	 * want to break it down to that level but instead send to a DB, throw a dialog
	 * for debugging, etc.
	 *
	 * Definition is in @see{src/app/core/core.module.ts}
	 *
	 * @param err {Error}
	 */
	handleError(err: Error) {
		if (err instanceof EvalError) {
			// console.log('Error Type=EvalError');
			Logger.error(err.message, err);
		}else if (err instanceof RangeError) {
			// console.log('Error Type=RangeError');
			Logger.error(err.message, err);
		}else if (err instanceof ReferenceError) {
			// console.log('Error Type=ReferenceError');
			Logger.error(err.message, err);
		}else if (err instanceof SyntaxError) {
			// console.log('Error Type=SyntaxError');
			Logger.error(err.message, err);
		}else if (err instanceof TypeError) {
			// console.log('Error Type=TypeError');
			Logger.error(err.message, err);
		}else if (err instanceof URIError) {
			// console.log('Error Type=URIError');
			Logger.error(err.message, err);
		}else if (err instanceof ErrorEvent) {
			// console.log('Error Type=ErrorEvent');
			Logger.error(err.error.message, err);
		}else {
			// console.log('Error Type=Unknown');
			Logger.error(err.message, err);
		}
		this.errorEvent.next(err);
	}
}

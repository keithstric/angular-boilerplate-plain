import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {UiService} from '@core/services/ui/ui.service';
import {DEBUG_DIALOGS} from 'src/environments/environment';

/**
 * This service is for surfacing errors in the UI. By default, we'll notify the user with a snackbar (toast) message.
 * You should only need to include this service if you need to surface errors in the ui or need to notify the user
 * of errors.
 */
@Injectable({
	providedIn: 'root'
})
export class ErrorService {
	public errorEvent: Subject<Error> = new Subject<any>();

	constructor(
		private _ui: UiService
	) {	}

	/**
	 * Create a snackbar notification
	 * @param {number} notificationCode - An error code or Http Status
	 * @param {string} notification - The notification message
	 */
	notifyUserSnackbar(notificationCode: number, notification: string) {
		this._ui.notifyUserShowSnackbar(`${notificationCode}: ${notification}`, 5000);
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
		console.error('ErrorService.handleError, err', err);
		if (err instanceof EvalError) {
			// console.log('Error Type=', err.name);
		}else if (err instanceof RangeError) {
			// console.log('Error Type=', err.name);
		}else if (err instanceof ReferenceError) {
			// console.log('Error Type=', err.name);
		}else if (err instanceof SyntaxError) {
			// console.log('Error Type=', err.name);
		}else if (err instanceof TypeError) {
			// console.log('Error Type=', err.name);
		}else if (err instanceof URIError) {
			// console.log('Error Type=', err.name);
		}else if (err instanceof ErrorEvent) {
			// console.log('Error Type=', err.name);
		}else {
			// console.log('Error Type=', err.name);
		}
		if (DEBUG_DIALOGS) {
			this._ui.notifyUserShowConfirmDialog({
				noCancelButton: true,
				messageHtml: `<span>${err.message}</span><pre>${err.stack}</pre>`,
				title: `Error: ${err.name}`,
				confirmButtonText: 'OK'
			});
		}
	}

	/**
	 * Will notify the user and update the errorEvent Subject
	 * @param {number} errorCode
	 * @param {string} message
	 * @param {Error} err
	 */
	handleRequestError(errorCode: number, message: string, err: Error) {
		this.notifyUserSnackbar(errorCode, err.message);
		this.errorEvent.next(err);
		return throwError(err);
	}

	/**
	 * Handle a response error: notify the user and update the errorEvent Subject
	 * @param err
	 * @returns {Observable<Error>}
	 */
	handleResponseError(err: HttpErrorResponse) {
		this.notifyUserSnackbar(err.status, err.message);
		this.errorEvent.next(err.error);
		return throwError(err);
	}
}

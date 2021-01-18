import {ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {DomInjectorService} from '@core/services/dom-injector/dom-injector.service';
import {SnackBarComponent} from '@shared/components/snack-bar/snack-bar.component';
import {SnackbarConfig} from '@shared/components/snack-bar/snack-bar.interface';
import {BehaviorSubject} from 'rxjs';

interface SnackBarDisplay {
	componentRef: ComponentRef<unknown>;
	config: SnackbarConfig;
	timeout?: any;
}

/**
 * this class is for controlling the display and dismissal of toast/snackbar notifications. If multiple
 * snackbars are received, it will que (FIFO) the requests and show each one after the previous one is dismissed.
 *
 * @example
 *
 * ```js
 * @Injectable()
 * export class NotificationService {
 *
 *   constructor(private _snackbarRef: SnackBarRef) {}
 *
 *   showSnackbar() {
 *     const config = {
 *     message: 'Here is a snackbar message',
 *     messageType: SnackbarMessageTypes.SUCCESS,
 *     duration: 5000,
 *     action: {
 *       label: 'OK',
 *       action: () => {
 *         console.log('action clicked')}
 *       }
 *     }
 *     this._snackbarRef.show(config);
 *   }
 * }
 * ```
 */
@Injectable()
export class SnackBarRef {
	/**
	 * The current snackbar
	 * @private
	 */
	private _currentSnackbar: SnackBarDisplay;
	/**
	 * The DomInjectorService for moving the snackbar out into the body tag
	 * @private
	 */
	private _domInjector: DomInjectorService;
	/**
	 * The queue of snackbars to display. This queue is FIFO
	 * @private
	 */
	private snackbarsQue: BehaviorSubject<SnackBarDisplay[]> = new BehaviorSubject<SnackBarDisplay[]>([]);

	constructor(private _injector: Injector) {
		this._listenToSnackBars();
	}

	/**
	 * Setup a listener for the snackbarsQue. Will display each snackbar in the que once
	 * the currently displayed snackbar is dismissed and the que changes
	 */
	private _listenToSnackBars() {
		this.snackbarsQue
			.subscribe((snackBars) => {
				if (snackBars && snackBars.length) {
					if (!this._currentSnackbar) {
						this._displaySnackbar(snackBars[0]);
					}
				}
			});
	}

	/**
	 * Create the SnackbarDisplay and add it to the que
	 * @param {SnackbarConfig} config
	 * @returns {ComponentRef}
	 */
	show(config: SnackbarConfig): ComponentRef<unknown> {
		if (!this._domInjector) {
			this._domInjector = this._injector.get(DomInjectorService);
		}
		const componentRef = this._domInjector.createComponent(SnackBarComponent, config);
		const snackbars = this.snackbarsQue.value;
		snackbars.push({componentRef, config});
		this.snackbarsQue.next(snackbars);
		return componentRef;
	}

	/**
	 * Display the snackbar, setup the dismiss timer, set _currentSnackbar
	 * @param currentSnackbar
	 * @private
	 */
	private _displaySnackbar(currentSnackbar: SnackBarDisplay): void {
		if (currentSnackbar) {
			const {componentRef, config} = currentSnackbar;
			// remove snackbar after set time
			currentSnackbar.timeout = setTimeout(() => {
				this.dismiss();
			}, config.duration || 5000);
			this._currentSnackbar = currentSnackbar;
			this._setSnackbarDismissEventHandler(componentRef.instance as SnackBarComponent);
			this._domInjector.attachComponent(componentRef, document.body);
		}
	}

	/**
	 * Dismiss the snackbar. Clear the timer, add the exit animation, then once
	 * the animation is done, clear the _currentSnackbar and get rid of the top
	 * element in the que. Do not run the action unless the action button is
	 * clicked on
	 * @returns {Promise}
	 */
	dismiss() {
		clearTimeout(this._currentSnackbar.timeout);
		this._addExitAnimationClass();
		// wait for animation to finish, animation is 500ms
		setTimeout(() => {
			const {componentRef} = this._currentSnackbar;
			this._domInjector.removeComponent(componentRef);
			this._currentSnackbar = undefined;
			const currQue = this.snackbarsQue.value;
			currQue.shift();
			this.snackbarsQue.next(currQue);
		}, 510);
	}

	/**
	 * Setup the event handler to catch the dismiss event from the snackbar component.
	 * Runs the action and then dismisses the snackbar
	 * @param snackBar
	 * @private
	 */
	private _setSnackbarDismissEventHandler(snackBar: SnackBarComponent) {
		snackBar.dismissSnackbar.subscribe(() => {
			this._runAction()
				.then(() => {
					this.dismiss();
				});
		});
	}

	/**
	 * Get the app-snackbar DOM element
	 * @private
	 */
	private _getDomElement() {
		const {componentRef} = this._currentSnackbar;
		return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
	}

	/**
	 * Adds the dismiss-animation style class to the snackbar container
	 * @private
	 */
	private _addExitAnimationClass() {
		const domElement = this._getDomElement();
		const domContainer = domElement.querySelector('.snackbar-container');
		domContainer.classList.add('dismiss-animation');
	}

	/**
	 * Run any action handler that is defined in the config
	 * @returns {Promise}
	 * @private
	 */
	private _runAction(): Promise<any> {
		const {config} = this._currentSnackbar;
		return new Promise((resolve, reject) => {
			if (config.action && config.action.actionHandler) {
				config.action.actionHandler();
			}
			resolve(true);
		});
	}
}

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

@Injectable()
export class SnackBarRef {
	private _currentSnackbar: SnackBarDisplay;
	private _domInjector: DomInjectorService;
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
	show(config: SnackbarConfig) {
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
				this.dismiss()
					.catch((err) => {
						throw err;
					});
			}, config.duration || 5000);
			this._currentSnackbar = currentSnackbar;
			this._setSnackbarDismissEventHandler(componentRef.instance as SnackBarComponent);
			this._domInjector.attachComponent(componentRef, document.body);
		}
	}

	/**
	 * Dismiss the snackbar. Run the action, clear the timer, add the exit animation, then once
	 * the animation is done, clear the _currentSnackbar and get rid of the top
	 * element in the que
	 * @returns {Promise}
	 */
	dismiss() {
		clearTimeout(this._currentSnackbar.timeout);
		return this._runAction()
			.then(() => {
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
			});
	}

	/**
	 * Setup the event handler to catch the dismiss event from the snackbar component
	 * @param snackBar
	 * @private
	 */
	private _setSnackbarDismissEventHandler(snackBar: SnackBarComponent) {
		snackBar.dismissSnackbar.subscribe(() => {
			this.dismiss();
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
	private _runAction() {
		const {config} = this._currentSnackbar;
		return new Promise((resolve, reject) => {
			if (config.action && config.action.actionHandler) {
				config.action.actionHandler();
			}
			resolve();
		});
	}
}

import {ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {DomInjectorService} from '@core/services/dom-injector/dom-injector.service';
import {SnackBarComponent} from '@shared/components/snack-bar/snack-bar.component';
import {SnackbarConfig} from '@shared/components/snack-bar/snack-bar.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SnackBarRef {
	private snackBarRef: ComponentRef<unknown>;
	private config: SnackbarConfig;
	private _domInjector: DomInjectorService;
	snackbarsObs: BehaviorSubject<Map<ComponentRef<unknown>, SnackbarConfig>>
		= new BehaviorSubject<Map<ComponentRef<unknown>, SnackbarConfig>>(new Map());

	constructor(private _injector: Injector) {
		this.init();
	}

	/**
	 * Setup a listener for the snackbarsObs to remove any snackbars that may still be showing. This
	 * scenario happens if a snackbar is shown before a previous snackbar is removed
	 */
	init() {
		this.snackbarsObs
			.subscribe((snackBarsMap) => {
				snackBarsMap.forEach((config, snackbarRef) => {
					this._domInjector.removeComponent(snackbarRef);
					snackBarsMap.delete(snackbarRef);
				});
			});
	}

	/**
	 * Check if we currently have a snackbar showing. If so, add it to the snackBarsObs map then
	 * display the snackbar
	 * @param {SnackbarConfig} config
	 * @returns {ComponentRef}
	 */
	show(config: SnackbarConfig) {
		if (!this._domInjector) {
			this._domInjector = this._injector.get(DomInjectorService);
		}
		if (this.snackBarRef) {
			const snackbarsMap = this.snackbarsObs.value;
			snackbarsMap.set(this.snackBarRef, this.config);
			this.snackbarsObs.next(snackbarsMap);
		}
		return this._displaySnackbar(config);
	}

	/**
	 * Display the snackbar
	 * @param {SnackbarConfig} config
	 * @returns {ComponentRef}
	 * @private
	 */
	private _displaySnackbar(config: SnackbarConfig) {
		this.config = config;
		this.snackBarRef = this._domInjector.createComponent(SnackBarComponent, config);
		this._setSnackbarDismissEventHandler();
		this._domInjector.attachComponent(this.snackBarRef, document.body);
		/*setTimeout(() => {
			if (this.snackBarRef) {
				this.dismiss()
					.catch((err) => {
						throw err;
					});
			}
		}, config.duration || 5000);*/
		return this.snackBarRef;
	}

	/**
	 * Dismiss the snackbar
	 * @returns {Promise}
	 */
	dismiss() {
		return this._runAction()
			.then(() => {
				this._addExitAnimationClass();
				// wait for animation to finish
				setTimeout(() => {
					this._domInjector.removeComponent(this.snackBarRef);
					this.snackBarRef = undefined;
					this.config = undefined;
					this.snackbarsObs.next(new Map());
				}, 500);
			});
	}

	private _setSnackbarDismissEventHandler() {
		(this.snackBarRef.instance as SnackBarComponent).dismissSnackbar.subscribe(() => {
			this.dismiss();
		});
	}

	/**
	 * Get the app-snackbar DOM element
	 * @private
	 */
	private _getDomElement() {
		return (this.snackBarRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
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
		return new Promise((resolve, reject) => {
			if (this.config.action && this.config.action.actionHandler) {
				this.config.action.actionHandler();
			}
			resolve();
		});
	}
}

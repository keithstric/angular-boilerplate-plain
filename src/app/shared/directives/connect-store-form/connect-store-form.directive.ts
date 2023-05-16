import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {AddFormAction, getFormsState, PatchFormAction} from '@core/root-store/forms';
import {AppState} from '@core/root-store/models/app-state.model';
import {Logger} from '@core/services/logger/logger';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {catchError, debounceTime, take} from 'rxjs/operators';

/**
 * This directive is for taking the value from a form and persisting the form value
 * in the store
 */
@Directive({
	selector: '[appConnectFormToStore]'
})
export class ConnectStoreFormDirective implements OnInit, OnDestroy {
	@Input('appConnectFormToStore') formStatePath: string;
	@Output() formAddedToStore: EventEmitter<boolean> = new EventEmitter();
	@Output() formValueUpdatedInStore: EventEmitter<any> = new EventEmitter();
	subscriptions: Subscription = new Subscription();

	constructor(
		private formGroupDirective: FormGroupDirective,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		if (this.formStatePath) {
			this._setupFormInStore();
			this._listenToValueChanges();
			Logger.silly(`[ConnectStoreFormDirective] initialized with formStatePath=${this.formStatePath} and formGroup`, this.formGroupDirective);
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		Logger.silly('[ConnectStoreFormDirective] destroyed');
	}

	private _setupFormInStore() {
		this.subscriptions.add(
			this.store.select(getFormsState)
				.pipe(
					catchError(err => {
						this.formAddedToStore.emit(false);
						throw err;
					})
				)
				.subscribe((state) => {
					if (!state[this.formStatePath]) {
						const payload = {path: this.formStatePath, value: this.formGroupDirective.form.value};
						this.store.dispatch(new AddFormAction(payload));
						this.formAddedToStore.emit(true);
						Logger.silly('[ConnectStoreFormDirective._setupFormInStore selector] Dispatched AddFormAction with payload', payload);
					}
				})
		);
	}

	private _listenToValueChanges() {
		this.subscriptions.add(
			this.formGroupDirective.form.valueChanges
				.pipe(debounceTime(300))
				.subscribe((value) => {
					const payload = {path: this.formStatePath, value};
					this.store.dispatch(new PatchFormAction(payload));
					this.formValueUpdatedInStore.emit(value);
					Logger.silly('[ConnectStoreFormDirective._listenToValueChanges] Dispatched PatchFormAction with payload', payload);
				})
		);
	}
}

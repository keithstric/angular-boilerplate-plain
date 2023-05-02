import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {AddFormAction, PatchFormAction} from '@core/root-store/forms';
import {AppState} from '@core/root-store/models/app-state.model';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {debounceTime, take} from 'rxjs/operators';

@Directive({
	selector: '[appConnectFormToStore]'
})
export class ConnectStoreFormDirective implements OnInit, OnDestroy {
	@Input('appConnectFormToStore') formStatePath: string;
	formChange: Subscription;

	constructor(
		private formGroupDirective: FormGroupDirective,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.store.dispatch(new AddFormAction({path: this.formStatePath, value: this.formGroupDirective.form.value}));
		this.formChange = this.formGroupDirective.form.valueChanges
			.pipe(
				debounceTime(300)
			)
			.subscribe((value) => {
				this.store.dispatch(new PatchFormAction({path: this.formStatePath, value}));
			});
	}

	ngOnDestroy(): void {
		this.formChange?.unsubscribe();
	}
}

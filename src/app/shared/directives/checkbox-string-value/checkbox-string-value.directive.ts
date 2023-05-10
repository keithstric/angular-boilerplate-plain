import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormControlDirective, FormControlName} from '@angular/forms';
import {Logger} from '@core/services/logger/logger';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * This directive is for maintaining a value other than a boolean for a checkbox
 * group. Normally, a checkbox group is a FormArray with boolean controls. Checked
 * is true, unchecked is false. This directive will set the 'valueWhenChecked' property
 * value as the value of the checkbox instead of true. Likewise, when unchecked will
 * set the value to the valueWhenUnChecked property value.
 */
@Directive({
	selector: '[appCheckboxStringValue]'
})
export class CheckboxStringValueDirective implements AfterViewInit, OnDestroy {
	@Input('appCheckboxStringValue') valueWhenChecked: string;
	@Input() valueWhenUnChecked: string = null;
	@Output() checkboxValueUpdated: EventEmitter<string> = new EventEmitter<string>();
	subscriptions: Subscription = new Subscription();

	constructor(
		private checkboxElementRef: ElementRef<HTMLInputElement>,
		private formControlName: FormControlName,
		private formControlDirective: FormControlDirective
	) { }

	ngAfterViewInit() {
		if (!this.formControlName?.control && !this.formControlDirective.control) {
			throw new Error(`[CheckboxStringValueDirective.ngAfterViewInit] no form control for ${this.valueWhenChecked}`);
		}
		this._listenToCheckboxChange();
	}

	ngOnDestroy() {
		// Logger.silly('[CheckboxStringValueDirective.ngOnDestroy]');
		// this.subscriptions.unsubscribe();
	}

	get fieldName() {
		return this.formControlName?.control
			? this.formControlName.name
			: this.formControlDirective?.name;
	}

	get control() {
		return this.formControlName?.control
			? this.formControlName.control
			: this.formControlDirective?.control;
	}

	private _listenToCheckboxChange() {
		this.subscriptions.add(
			fromEvent(this.checkboxElementRef.nativeElement, 'change')
				.pipe(
					map((evt) => (evt.target as any).checked)
				)
				.subscribe((checked) => {
					Logger.silly(`[_listenToCheckboxChange subscription] ${this.fieldName} ${checked ? 'checked' : 'unchecked'}`);
					const value = checked ? this.valueWhenChecked : this.valueWhenUnChecked;
					this._updateFormControlValue(value);
				})
		);
	}

	private _updateFormControlValue(newValue: string) {
		if (this.control && name !== undefined && name !== null) {
			this.control.setValue(newValue);
			this.checkboxValueUpdated.emit(newValue);
			Logger.silly(`[CheckboxStringValueDirective._updateFormControlValue] set the value of ${this.fieldName} to ${this.control.value}`);
		}else{
			throw new Error(`[CheckboxStringValueDirective._updateFormControlValue] FormControl ${this.fieldName} not available`);
		}
	}
}

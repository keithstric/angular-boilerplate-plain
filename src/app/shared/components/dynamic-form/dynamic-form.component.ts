import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {Logger} from '@core/services/logger/logger';
import {Store} from '@ngrx/store';
import {
	FormFieldType,
	FormGroupDefinition,
	FormGroupObject,
	FormHelperService
} from '@shared/services/form-helper/form-helper.service';


export type SelectOptions = {value: any, label: string};
export interface FormControlsDefinition {
	ctrl: AbstractControl;
	label: string;
	type: string;
	options?: SelectOptions[];
	labelLocation?: string;
	fieldName: string;
	definitions?: FormControlsDefinition[];
	checkedValue?: string | number | boolean;
}

@Component({
	selector: 'app-dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
	@Input() formGroupValue?: FormGroupObject;
	@Input() formGroupDefinition?: FormGroupDefinition;
	@Input() formStatePath: string = 'demo';
	@Output() formGroupInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
	formGroup: FormGroup;
	renderedControls: FormControlsDefinition;

	constructor(private store: Store) {	}

	ngOnInit(): void {
		if (!this.formGroupValue && !this.formGroupDefinition) {
			throw new Error(`No formGroupValue or formGroupDefinition provided`);
		} else if (this.formGroupValue && this.formGroupDefinition) {
			Logger.warn('No need to provide both formGroupValue and formGroupDefinition. Using formGroupDefinition.');
			this._buildFormFromDefinition();
		} else	if (this.formGroupValue && !this.formGroupDefinition) {
			this._buildFormFromValue();
		} else if (this.formGroupDefinition && !this.formGroupValue) {
			this._buildFormFromDefinition();
		}
		this.formGroupInitialized.emit(this.formGroup);
		this.renderedControls = this._getFormDefinitions(this.formGroup);
	}

	private _buildFormFromValue() {
		this.formGroup = FormHelperService.convertObjToFormGroup(this.formGroupValue);
	}

	private _buildFormFromDefinition() {
		this.formGroup = FormHelperService.convertObjToFormGroup(
			this.formGroupDefinition.formGroupObject,
			this.formGroupDefinition.formGroupConfig
		);
	}

	private _getFieldName(control: AbstractControl) {
		return FormHelperService.getControlName(control);
	}

	private _getFieldLabel(control: AbstractControl) {
		const fieldName = FormHelperService.getControlName(control);
		const fieldLabel = this.formGroupDefinition?.formGroupConfig[fieldName]?.fieldLabel;
		return fieldLabel ? fieldLabel : fieldName;
	}

	private _getFieldType(control: AbstractControl) {
		const fieldName = FormHelperService.getControlName(control);
		let fieldType: FormFieldType = this.formGroupDefinition?.formGroupConfig[fieldName]?.fieldType || 'text';
		if (control instanceof FormGroup) {
			fieldType = 'object';
		}else if (control instanceof FormArray && fieldType !== 'checkboxes') {
			fieldType = 'array';
		}else if (control.value && typeof control.value === 'number') {
			fieldType = 'number';
		}
		return fieldType;
	}

	private _getFieldOptions(control: AbstractControl): SelectOptions[] {
		const fieldName = FormHelperService.getControlName(control);
		const options = this.formGroupDefinition?.formGroupConfig[fieldName]?.options.map((option) => {
			const selectOption = option.split('|');
			if (selectOption.length === 2) {
				return {value: selectOption[0], label: selectOption[1]};
			}
			return {value: selectOption[0], label: selectOption[0]};
		});
		return options || [];
	}

	private _getFieldLabelLocation(control: AbstractControl) {
		const fieldName = FormHelperService.getControlName(control);
		return this.formGroupDefinition?.formGroupConfig[fieldName]?.fieldLabelLocation || 'end';
	}

	private _getControlDefinitions(formCtrl: FormGroup | FormArray): FormControlsDefinition[] {
		const fgClazz = formCtrl.constructor.name;
		const ctrls: AbstractControl[] = fgClazz === 'FormGroup'
			? FormHelperService.formGroupControlsToArray((formCtrl as FormGroup))
			: (formCtrl as FormArray).controls as AbstractControl[];
		return ctrls
			.map((ctrl) => {
				const clazz = ctrl.constructor.name;
				switch (clazz) {
					case 'FormGroup':
						return {
							ctrl,
							label: this._getFieldLabel(ctrl),
							fieldName: this._getFieldName(ctrl),
							type: this._getFieldType(ctrl),
							definitions: this._getControlDefinitions(ctrl as FormGroup),
						};
					case 'FormControl':
						return {
							ctrl,
							label: this._getFieldLabel(ctrl),
							type: this._getFieldType(ctrl),
							options: this._getFieldOptions(ctrl),
							labelLocation: this._getFieldLabelLocation(ctrl),
							fieldName: this._getFieldName(ctrl)
						};
					case 'FormArray':
						const arrCtrlDef: FormControlsDefinition = {
							ctrl,
							label: this._getFieldLabel(ctrl),
							fieldName: this._getFieldName(ctrl),
							type: this._getFieldType(ctrl),
							definitions: this._getControlDefinitions(ctrl as FormArray)
						};
						if (arrCtrlDef.type === 'checkboxes') {
							arrCtrlDef.options = this._getFieldOptions(ctrl);
							arrCtrlDef.labelLocation = this._getFieldLabelLocation(ctrl);
							arrCtrlDef.definitions = arrCtrlDef.definitions.map((ctrlDef, idx) => {
								const {options, labelLocation} = arrCtrlDef;
								return {
									...ctrlDef,
									labelLocation,
									options: [options[idx]],
								};
							});
						}
						return arrCtrlDef;
				}
			});
	}

	private _getFormDefinitions(formGroup: FormGroup): FormControlsDefinition {
		return {
			ctrl: formGroup,
			definitions: this._getControlDefinitions(formGroup),
			label: '',
			fieldName: '',
			type: 'object'
		};
	}

}

import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {Logger} from '@core/services/logger/logger';
import {
	FormFieldType,
	FormGroupDefinition,
	FormGroupObject,
	FormHelperService
} from '@shared/services/form-helper/form-helper.service';

export type SelectOptions = {value: any, label: string};

@Component({
	selector: 'app-dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
	@Input() formGroupValue?: FormGroupObject;
	@Input() formGroupDefinition?: FormGroupDefinition;
	formGroup: FormGroup;

	constructor() {	}

	ngOnInit(): void {
		if (!this.formGroupValue && !this.formGroupDefinition) {
			throw new Error(`No formGroupValue or formGroupDefinition provided`);
		} else if (this.formGroupValue && this.formGroupDefinition) {
			Logger.warn('No need to provide both formGroupValue and formGroupDefinition');
			this.buildFormFromDefinition();
		} else	if (this.formGroupValue && !this.formGroupDefinition) {
			this.buildFormFromValue();
		} else if (this.formGroupDefinition && !this.formGroupValue) {
			this.buildFormFromDefinition();
		}
	}

	buildFormFromValue() {
		this.formGroup = FormHelperService.convertObjToFormGroup(this.formGroupValue);
	}

	buildFormFromDefinition() {
		this.formGroup = FormHelperService.convertObjToFormGroup(
			this.formGroupDefinition.formGroupObject,
			this.formGroupDefinition.formGroupConfig
		);
	}

	getFieldName(control: AbstractControl) {
		return FormHelperService.getControlName(control);
	}

	getFieldLabel(control: AbstractControl) {
		const fieldName = FormHelperService.getControlName(control);
		const fieldLabel = this.formGroupDefinition?.formGroupConfig[fieldName]?.fieldLabel;
		return fieldLabel ? fieldLabel : fieldName;
	}

	getFieldType(control: AbstractControl) {
		const fieldName = FormHelperService.getControlName(control);
		let fieldType: FormFieldType = this.formGroupDefinition?.formGroupConfig[fieldName]?.fieldType || 'text';
		if (control instanceof FormGroup) {
			fieldType = 'object';
		}else if (control instanceof FormArray) {
			fieldType = 'array';
		}else if (control.value && typeof control.value === 'number') {
			fieldType = 'number';
		}
		return fieldType;
	}

	getFieldOptions(control: AbstractControl): SelectOptions[] {
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

	getControlsArray(formGroup: FormGroup) {
		return FormHelperService.formGroupControlsToArray(formGroup);
	}

	getFieldLabelLocation(control: AbstractControl) {
		const fieldName = FormHelperService.getControlName(control);
		return this.formGroupDefinition?.formGroupConfig[fieldName]?.fieldLabelLocation || 'end';
	}

}

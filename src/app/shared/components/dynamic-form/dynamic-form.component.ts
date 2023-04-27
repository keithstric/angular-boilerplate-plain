import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Logger} from '@core/services/logger/logger';
import {
	FormGroupDefinition,
	FormGroupObject,
	FormHelperService
} from '@shared/services/form-helper/form-helper.service';

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

}

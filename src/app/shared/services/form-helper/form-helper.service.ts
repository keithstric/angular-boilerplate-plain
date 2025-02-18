import {Injectable} from '@angular/core';
import {
	AbstractControl,
	AbstractControlOptions,
	UntypedFormArray,
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	ValidationErrors,
	ValidatorFn
} from '@angular/forms';
import {Logger} from '@core/services/logger/logger';
import {ServiceLocator} from '@core/services/service-locator';

/** Interface for an invalid control */
export interface InvalidControl {
	fieldName: string;
	control: AbstractControl;
}
/** Interface for invalid control with errors included */
export interface InvalidControlErrors extends InvalidControl {
	errors: ValidationErrors;
}
/** Interface for a ValidatorConfig object, used in setFormGroupValidators */
export interface ValidatorConfig {
	fieldName: string;
	validators: ValidatorFn[];
}

export type FormGroupConfig = AbstractControlOptions | FormGroupObjectConfig;
export type FormGroupObject = {[key: string]: any};
export type FormGroupDefinition = {formGroupObject: FormGroupObject, formGroupConfig: FormGroupObjectConfig};

/**
 * Key must exist in FormGroupObject. The value of that key will be
 * an AbstractControlOptions object which will be applied to a FormControl
 */
export type FormGroupObjectConfig = {[key in keyof FormGroupObject]: (AbstractControlOptions | FormGroupConfig) & {
	fieldType?: FormFieldType,
	fieldLabel?: string,
	options?: string[],
	fieldLabelLocation?: 'start' | 'end'
}};
export type FormFieldType = 'text' | 'number' | 'select' | 'textarea' | 'object' | 'array' | 'email' | 'radio' | 'checkbox' | 'checkboxes';
export type FormControlType = 'FormGroup' | 'FormArray' | 'FormControl';
export type FormControlStatus = 'VALID' | 'INVALID' | 'DISABLED' | 'PENDING';

/**
 * This is a class of static methods to assist working with Reactive Forms
 */
@Injectable({
	providedIn: 'root'
})
export class FormHelperService {

	constructor() {}

	/**
	 * Take an object with values and build a FormGroup from it. If that object contains
	 * array values a FormArray will be created. If the obj contains a property that is an object
	 * another FormGroup will be created.
	 *
	 * The biggest draw back to using this method is you will have to manually create validators
	 * @param obj
	 * @param objConfig
	 * @example
	 *
	 * const someObj = {foo: 'bar', bar: 'baz', baz: [1,2], boo: {abc: 123}}
	 * const someObjFormGroup = FormBuilderService.convertObjToFormGroup(someObj);
	 * console.log('someObjFormGroup.controls=', someObjFormGroup.controls);
	 * {
	 *   foo: FormControl,
	 *   bar: FormControl,
	 *   baz: FormArray (controls: {0: 1 (FormControl), 1: 2 (FormControl)}),
	 *   boo: FormGroup (controls: {abc: 123 (FormControl)})
	 * }
	 *
	 * // with options
	 * const someObj = {foo: 'bar', bar: 'baz', baz: [1,2], boo: {abc: 123}}
	 * const someObjOptions = {foo: {updateOn: 'blur'}}
	 * const someObjFormGroup = FormBuilderService.convertObjToFormGroup(someObj, someObjOptions);
	 * console.log('someObjFormGroup.controls=', someObjFormGroup.controls);
	 * {
	 *   foo: FormControl,
	 *   bar: FormControl,
	 *   baz: FormArray (controls: {0: 1 (FormControl), 1: 2 (FormControl)}),
	 *   boo: FormGroup (controls: {abc: 123 (FormControl)})
	 * }
	 */
	static convertObjToFormGroup(obj: FormGroupObject, objConfig?: FormGroupObjectConfig): UntypedFormGroup {
		if (obj !== null && obj !== undefined && typeof obj !== 'boolean') {
			let fb = ServiceLocator.injector?.get(UntypedFormBuilder);
			if (!fb) {
				fb = new UntypedFormBuilder();
			}
			if (fb) {
				const group = fb.group({});
				Object.keys(obj).forEach((key) => {
					const controlConfig = objConfig ? objConfig[key] : undefined;
					const keyVal = obj[key];
					if (Array.isArray(keyVal)) {
						const formArr = this.convertArrayToFormArray(keyVal);
						group.addControl(key, formArr);
					} else if (keyVal instanceof Date) {
						const dateCtl = fb.control(keyVal, controlConfig as AbstractControlOptions);
						group.addControl(key, dateCtl);
					} else if (keyVal !== null && typeof keyVal === 'object') { // typeof null = 'object' so take that into account
						const childGrp = this.convertObjToFormGroup(keyVal, controlConfig as any);
						group.addControl(key, childGrp);
					} else if (typeof keyVal === 'string' || typeof keyVal === 'number' || typeof keyVal === 'boolean') {
						const ctrl = fb.control(keyVal, controlConfig as AbstractControlOptions);
						group.addControl(key, ctrl);
					} else {
						const emptyCtl = fb.control(keyVal, controlConfig as AbstractControlOptions);
						group.addControl(key, emptyCtl);
					}
				});
				return group;
			}
		}
		// throw new Error('Nothing provided to convertObjToFormGroup');
		Logger.warn('Nothing provided to convertObjToFormGroup', obj);
	}

	/**
	 * Take an array of items and convert them to a FormArray. This is for an array of objects,
	 * array of boolean will not work
	 * @param arr
	 * @param forCheckboxes
	 */
	static convertArrayToFormArray(arr: any[], forCheckboxes: boolean = false): UntypedFormArray {
		let fb = ServiceLocator.injector?.get(UntypedFormBuilder);
		if (!fb) {
			fb = new UntypedFormBuilder();
		}
		if (fb && !forCheckboxes) {
			let valArr = [];
			if (arr?.length) {
				valArr = arr.map((obj) => {
					if (typeof obj === 'boolean' || typeof obj === 'string' || typeof obj === 'number' || obj instanceof Date) {
						return new UntypedFormControl(obj);
					} else if (obj !== null && typeof obj === 'object') {
						return FormHelperService.convertObjToFormGroup(obj);
					} else if (Array.isArray(obj)) {
						return FormHelperService.convertArrayToFormArray(obj);
					} else {
						return new UntypedFormControl(obj);
					}
				});
			}
			return fb.array(valArr);
		} else {
			// todo: implement a checkbox solution to prevent ending up with an array of booleans instead of an array of objects
		}
	}

	/**
	 * Get the controls in a form group as an array (not a FormArray) in order to loop through them
	 * and do something to the individual controls. FormGroup.controls normally returns an object.
	 * @param formGroup
	 */
	static formGroupControlsToArray(formGroup: UntypedFormGroup): AbstractControl[] {
		const returnVal = [];
		if (formGroup?.controls) {
			Object.keys(formGroup.controls).forEach((key) => {
				returnVal.push(formGroup.get(key));
			});
		}
		return returnVal;
	}

	/**
	 * returns just the invalid children of the provided FormGroup. If a child is an invalid FormGroup or FormArray will return
	 * the FormGroup/FormArray and NOT it's invalid FormControls
	 * @param formGroup
	 */
	static getInvalidFormGroupControls(formGroup: UntypedFormGroup): InvalidControl[] {
		const returnVal = [];
		if (formGroup?.controls) {
			Object.keys(formGroup.controls).forEach((key) => {
				const ctrl = formGroup.get(key);
				if (ctrl.invalid) {
					returnVal.push({fieldName: key, control: ctrl});
				}
			});
		}
		return returnVal;
	}

	/**
	 * Sets validators on a FormGroup based on the ValidatorConfig. If
	 * validatorConfigs is an empty array, will remove all validators for each
	 * control in the formGroup.
	 *
	 * NOTE: If your formGroup contains formGroups or FormArrays, will not recursively add validators
	 * to child FormGroups, only top level controls
	 *
	 * @param validatorConfigs
	 * @param formGroup
	 * @example
	 *
	 * const fg = FormBuilderService.convertObjToFormGroup({firstName: 'foo'});
	 * const validators: ValidatorConfig[] = [
	 * 	{fieldName: 'firstName', validators: [Validators.required]}
	 * ];
	 * FormBuilderService.setFormGroupValidators(validators, fg);
	 */
	static setFormGroupValidators(validatorConfigs: ValidatorConfig[], formGroup: UntypedFormGroup) {
		const formGroupKeys = Object.keys(formGroup?.controls || {});
		if (validatorConfigs && formGroupKeys.length) {
			formGroupKeys.forEach((ctrlFieldName) => {
				const fgControl = formGroup.get(ctrlFieldName);
				const controlValidators = validatorConfigs.find(validator => validator.fieldName === ctrlFieldName)?.validators;
				if (controlValidators?.length) {
					fgControl.setValidators(controlValidators);
				} else {
					fgControl.clearValidators();
				}
			});
		}else if (!validatorConfigs || !formGroup) {
			const missing = !validatorConfigs
				? {arg: 'validatorConfigs', value: validatorConfigs}
				: !formGroup
					? {arg: 'formGroup', value: formGroup}
					: !validatorConfigs && !formGroup
						? {arg: 'both', value: [validatorConfigs, formGroup]}
						: {arg: 'nothing', value: undefined};
			console.warn(`[FormBuilderService.setFormGroupValidators] Missing arguments ${missing.arg} (${missing.value})`);
		}else if (!formGroupKeys.length) {
			console.warn('[FormBuilderService.setFormGroupValidators] FormGroup contain 0 controls',
				validatorConfigs, formGroup);
		}
	}

	/**
	 * returns the invalid FormControls only. Will not return invalid FormGroups or FormArrays
	 * @param formControl
	 */
	static getInvalidControls(formControl: AbstractControl): InvalidControlErrors[] {
		// tslint:disable-next-line:max-line-length
		// console.log(`getInvalidControls, ${FormBuilderService.getControlName(formControl)} - ${FormBuilderService.getControlType(formControl)}`);
		let invalidControls: InvalidControlErrors[] = [];
		if (formControl) {
			if ((formControl instanceof UntypedFormGroup || formControl instanceof UntypedFormArray) && formControl.invalid) {
				Object.keys(formControl.controls).forEach((key) => {
					const childCtrl = formControl.get(key);
					const grpInvalidControls = FormHelperService.getInvalidControls(childCtrl);
					invalidControls = [...invalidControls, ...grpInvalidControls];
				});
			} else if (formControl.invalid) {
				invalidControls.push({
					fieldName: FormHelperService.getControlName(formControl),
					control: formControl,
					errors: formControl.errors
				});
			}
		}
		return invalidControls;
	}

	/**
	 * Get the name of an AbstractControl (i.e. FormGroup, FormArray, FormControl). If we've reached
	 * the top of the tree (meaning the very first form control) return 'TopControl'
	 * @param control
	 */
	static getControlName(control: AbstractControl): string {
		const parentControls = control.parent?.controls;
		if (parentControls) {
			return Object.keys(parentControls).find(name => control === parentControls[name]);
		} else {
			return 'TopControl';
		}
	}

	/**
	 * Get the full path of a control from the top of the FormGroup/FormArray
	 * @param control
	 * @example
	 *
	 * // Normally you would just have the control and probably not know the path.
	 * // This makes this example a little silly, because you already have the path
	 * // but I think it at least shows the concept of using the function
	 * const fg = FormHelperService.convertObjToFormGroup({foo: {bar: { baz: [{boom: 'bam'}]}}};
	 * const ctrl = fg.get('foo.bar.baz.0.boom');
	 * const fullPath = FormHelperService.getFullControlPath(ctrl); // ==> '.foo.bar.baz.0.bada'
	 */
	static getFullControlPath(control: AbstractControl): string {
		let pathItems: string[] = [FormHelperService.getControlName(control)];
		let ancestorCtrl = control.parent;
		while (ancestorCtrl) {
			pathItems.push(FormHelperService.getControlName(ancestorCtrl));
			ancestorCtrl = ancestorCtrl.parent;
		}
		pathItems = pathItems.reverse();
		if (pathItems[0] === 'TopControl') {
			pathItems.shift();
		}
		return pathItems.join('.');
	}

	/**
	 * Get the type of control
	 * @param control
	 */
	static getControlType(control: AbstractControl): FormControlType {
		if (control instanceof UntypedFormGroup) {
			return 'FormGroup';
		} else if (control instanceof UntypedFormArray) {
			return 'FormArray';
		} else {
			return 'FormControl';
		}
	}

	/**
	 * Clones an abstract control and its validators.
	 * Credit: https://stackoverflow.com/questions/48308414/deep-copy-of-angular-reactive-form
	 * @param control
	 */
	static cloneAbstractControl<T extends AbstractControl>(control: T): T {
		let newControl: T;
		if (control instanceof UntypedFormGroup) {
			const formGroup = new UntypedFormGroup({}, control.validator, control.asyncValidator);
			const controls = control.controls;
			Object.keys(controls).forEach(key => {
				formGroup.addControl(key, FormHelperService.cloneAbstractControl(controls[key]));
			});
			newControl = formGroup as any;
		} else if (control instanceof UntypedFormArray) {
			const formArray = new UntypedFormArray([], control.validator, control.asyncValidator);
			control.controls.forEach(formControl => formArray.push(FormHelperService.cloneAbstractControl(formControl)));
			newControl = formArray as any;
		} else if (control instanceof UntypedFormControl) {
			newControl = new UntypedFormControl(control.value, control.validator, control.asyncValidator) as any;
		} else {
			throw new Error('Error: unexpected control type');
		}
		if (control.disabled) {
			newControl.disable({emitEvent: false});
		}
		return newControl;
	}
}

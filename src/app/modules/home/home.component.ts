import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiMethod} from '@core/interfaces/api.interface';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageTypes} from '@core/services/local-storage/local-storage.interface';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {Logger} from '@core/services/logger/logger';
import {NotificationService} from '@core/services/notification/notification.service';
import {LayoutService} from '@layout/services/layout/layout.service';
import {HomeHeaderComponent} from '@modules/home/components/home-header/home-header.component';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';
import {
	FormGroupDefinition,
	FormGroupObjectConfig,
	FormHelperService
} from '@shared/services/form-helper/form-helper.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {delay, take} from 'rxjs/operators';


/**
 * Please keep in mind this is a demo home component. You will probably want to replace this
 * component with your own
 */
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	charCounterForm: FormGroup;
	origHeaderComponent: any;

	/**
	 * A fake user for the dynamicForm component demo
	 */
	user = {
		firstName: 'John',
		lastName: undefined,
		email: 'john@unknown.com',
		gender: 'male',
		age: 35,
		subscriber: 'Yes',
		address: {
			address1: '123 abc way',
			city: 'Imaginary',
			state: 'GA',
			zip: '30134'
		},
		communicationTypes: ['email', 'text', null],
		aliases: ['foo', 'bar', 'baz', {aliasFN: 'boom', aliasLN: 'Jordan'}],
	};
	/**
	 * A formGroupObjectConfig for the dynamic form demo
	 */
	userFormGroupConfig: FormGroupObjectConfig = {
		gender: {
			fieldType: 'select',
			options: ['Male|male', 'Female|female', 'Other|other']
		},
		subscriber: {
			fieldType: 'radio',
			fieldLabelLocation: 'end',
			options: ['Yes|yes', 'No|no']
		},
		communicationTypes: {
			fieldType: 'checkboxes',
			fieldLabelLocation: 'start',
			options: ['email', 'text', 'both']
		}
	};
	/**
	 * Form group definition for the dynamic form demo
	 */
	formGroupDef: FormGroupDefinition = {formGroupObject: this.user, formGroupConfig: this.userFormGroupConfig};
	/**
	 * Listeners for the dynamic form group demo
	 */
	dynamicFormSubj: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
	dynamicFormListener: Subscription;
	dynamicFormGroupVals: any;

	constructor(
		private _http: HttpService,
		private _layout: LayoutService
	) {}

	ngOnInit(): void {
		this.origHeaderComponent = this._layout.headerSource.value;
		this.charCounterForm = FormHelperService.convertObjToFormGroup({
			up: '',
			down: ''
		}, {
			up: {
				validators: [Validators.maxLength(10)],
				updateOn: 'change'
			},
			down: {
				validators: [Validators.maxLength(10)],
				updateOn: 'change'
			}
		});
		NotificationService.showSnackbar({
			message: 'Welcome to angular-boilerplate-plain!',
			messageType: SnackbarMessageTypes.SUCCESS
		});
		Logger.info(`Welcome to angular-boilerplate-plain logger`, 'string param', {foo: 'bar', baz: 'boo'}, ['foo', 'bar']);
	}

	ngOnDestroy() {
		this._layout.setHeader(this.origHeaderComponent);
	}

	showSnackbar() {
		NotificationService.showSnackbar({
			message: 'Some random snackbar "warning" message',
			messageType: SnackbarMessageTypes.WARNING
		});
	}

	getRandomData() {
		this._http.doRequest('https://pokeapi.co/api/v2/pokemon', ApiMethod.GET)
			.subscribe((response) => {
				Logger.debug('[button click handler] response from request to https://pokeapi.co/api/v2/pokemon', response);
			});
	}

	getSingleData() {
		this._http.doRequest('https://pokeapi.co/api/v2/pokemon/1/', ApiMethod.GET)
			.subscribe((response) => {
				Logger.debug('[button click handler] response from request to https://pokeapi.co/api/v2/pokemon/1', response);
			});
	}

	clearSessionStorage() {
		LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'https://pokeapi.co/api/v2/pokemon/1/');
	}

	onToggleHeaderClick() {
		if (this._layout.headerSource.value.name === 'SiteHeaderComponent') {
			this._layout.setHeader(HomeHeaderComponent);
		}else{
			this._layout.setHeader(this.origHeaderComponent);
		}
	}

	onDynamicFormInit(formGroup: FormGroup) {
		this._listenToDynamicForm();
		this.dynamicFormSubj.next(formGroup);
	}

	private _listenToDynamicForm() {
		const getFormGroupVals = (formGroup: FormGroup, placeHolder: any) => {
			if (formGroup?.controls) {
				Object.keys(formGroup.controls).forEach((fieldName) => {
					const ctrl = formGroup.get(fieldName);
					const clazz = ctrl.constructor.name;
					switch (clazz) {
						case 'FormControl':
							const ctrlValue = ctrl.value;
							placeHolder[`${clazz}_${fieldName}`] = `${ctrlValue}`;
							break;
						case 'FormGroup':
							placeHolder[`${clazz}_${fieldName}`] = getFormGroupVals(ctrl as FormGroup, {});
							break;
						case 'FormArray':
							placeHolder[`${clazz}_${fieldName}`] = getFormArrayVals(ctrl as FormArray, []);
							break;
					}
				});
				return placeHolder;
			}
			return {};
		};
		const getFormArrayVals = (formArray: FormArray, placeHolder: any) => {
			if (formArray?.controls) {
				formArray.controls.forEach((ctrl, idx) => {
					const clazz = ctrl.constructor.name;
					switch (clazz) {
						case 'FormControl':
							const ctrlValue = ctrl.value;
							placeHolder.push(`${clazz}_${idx} = ${ctrlValue}`);
							break;
						case 'FormGroup':
							placeHolder.push(`${clazz}_${idx} = ${JSON.stringify(getFormGroupVals(ctrl as FormGroup, {}), null, 2)}`);
							break;
						case 'FormArray':
							placeHolder.push(`${clazz}_${idx} = ${getFormArrayVals(ctrl as FormArray, placeHolder)}`);
					}
				});
				return placeHolder;
			}
			return [];
		};

		if (!this.dynamicFormListener) {
			this.dynamicFormListener = this.dynamicFormSubj
				.pipe(
					take(2),
					delay(1)
				)
				.subscribe((formGroup) => {
					if (formGroup?.controls) {
						this.dynamicFormGroupVals = getFormGroupVals(formGroup, {});
					}
				});
		}
	}
}

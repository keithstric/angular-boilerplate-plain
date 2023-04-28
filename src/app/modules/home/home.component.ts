import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
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

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	charCounterForm: FormGroup;
	origHeaderComponent: any;
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
		aliases: ['foo', 'bar', 'baz', {aliasFN: 'boom', aliasLN: 'Jordan'}]
	};
	userFormGroupConfig: FormGroupObjectConfig = {
		gender: {
			fieldType: 'select',
			options: ['Male|male', 'Female|female', 'Other|other']
		},
		subscriber: {
			fieldType: 'radio',
			fieldLabelLocation: 'end',
			options: ['Yes|yes', 'No|no']
		}
	};
	formGroupDef: FormGroupDefinition = {formGroupObject: this.user, formGroupConfig: this.userFormGroupConfig};

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
}

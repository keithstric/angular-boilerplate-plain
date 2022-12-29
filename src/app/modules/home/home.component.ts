import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ApiMethod} from '@core/interfaces/api.interface';
import {HttpService} from '@core/services/http/http.service';
import {Logger} from '@core/services/logger/logger';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';
import {FormHelperService} from '@shared/services/form-helper/form-helper.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	charCounterForm: FormGroup;
	constructor(
		private _http: HttpService
	) {}

	ngOnInit(): void {
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

	showSnackbar() {
		NotificationService.showSnackbar({
			message: 'Some random snackbar "warning" message',
			messageType: SnackbarMessageTypes.WARNING
		});
	}

	getRandomData() {
		this._http.doRequest('https://pokeapi.co/api/v2/pokemon', ApiMethod.GET)
			.subscribe((response) => {
				Logger.info('response from https://pokeapi.co/api/v2/pokemon', response);
			});
	}

	getSingleData() {
		this._http.doRequest('https://pokeapi.co/api/v2/pokemon/1/', ApiMethod.GET)
			.subscribe((response) => {
				Logger.info('response from https://pokeapi.co/api/v2/pokemon/1', response);
			});
	}

}

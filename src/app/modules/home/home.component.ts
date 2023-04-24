import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ApiMethod} from '@core/interfaces/api.interface';
import {HttpService} from '@core/services/http/http.service';
import {Logger} from '@core/services/logger/logger';
import {NotificationService} from '@core/services/notification/notification.service';
import {LayoutService} from '@layout/services/layout/layout.service';
import {HomeHeaderComponent} from '@modules/home/components/home-header/home-header.component';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';
import {FormHelperService} from '@shared/services/form-helper/form-helper.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	charCounterForm: FormGroup;
	origHeaderComponent: any;

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
				Logger.info('response from https://pokeapi.co/api/v2/pokemon', response);
			});
	}

	getSingleData() {
		this._http.doRequest('https://pokeapi.co/api/v2/pokemon/1/', ApiMethod.GET)
			.subscribe((response) => {
				Logger.info('response from https://pokeapi.co/api/v2/pokemon/1', response);
			});
	}

	onToggleHeaderClick() {
		if (this._layout.headerSource.value.name === 'SiteHeaderComponent') {
			this._layout.setHeader(HomeHeaderComponent);
		}else{
			this._layout.setHeader(this.origHeaderComponent);
		}
	}
}

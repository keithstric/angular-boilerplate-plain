import {Component, OnInit} from '@angular/core';
import {Logger} from '@core/services/logger/logger';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor() {}

	ngOnInit(): void {
		/*for (let i = 1; i <= 4; i++) {
			const config = {
				messageType: SnackbarMessageTypes.SUCCESS,
				message: `snackbar #${i}`
			};
			this._notify.showSnackbar(config);
		}*/
		NotificationService.showSnackbar({
			message: 'Welcome to angular-boilerplate-plain!',
			messageType: SnackbarMessageTypes.SUCCESS
		});
		Logger.info(`Welcome to angular-boilerplate-plain logger`, 'string param', {foo: 'bar', baz: 'boo'}, ['foo', 'bar']);
	}

	showSnackbar() {
		NotificationService.showSnackbar({
			message: 'foo bar baz',
			messageType: SnackbarMessageTypes.WARNING
		});
	}

}

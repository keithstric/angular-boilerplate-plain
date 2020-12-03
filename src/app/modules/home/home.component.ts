import {Component, OnInit} from '@angular/core';
import {LoggerService} from '@core/services/logger/logger.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private _notify: NotificationService,
		private logger: LoggerService
	) {}

	ngOnInit(): void {
		/*for (let i = 1; i <= 4; i++) {
			const config = {
				messageType: SnackbarMessageTypes.SUCCESS,
				message: `snackbar #${i}`
			};
			this._notify.showSnackbar(config);
		}*/
		this._notify.showSnackbar({
			message: 'Welcome to angular-boilerplate-plain!',
			messageType: SnackbarMessageTypes.SUCCESS
		});
		this.logger.info(`Welcome to angular-boilerplate-plain logger`, 'string param', {foo: 'bar', baz: 'boo'}, ['foo', 'bar']);
	}

	showSnackbar() {
		this._notify.showSnackbar({
			message: 'foo bar baz',
			messageType: SnackbarMessageTypes.WARNING
		});
	}

}

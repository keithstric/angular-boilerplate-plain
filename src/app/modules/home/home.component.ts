import {Component, OnInit} from '@angular/core';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private _notify: NotificationService) {}

	ngOnInit(): void {
		this._notify.showSnackbar({message: 'Welcome to angular-boilerplate-plain!', messageType: SnackbarMessageTypes.SUCCESS});
	}

}

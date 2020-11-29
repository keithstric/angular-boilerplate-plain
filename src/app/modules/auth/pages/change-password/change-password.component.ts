import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {iUserState} from '@core/root-store/models/app-state.model';
import {ChangeUserPasswordAction} from '@core/root-store/user/user.action';
import {Store} from '@ngrx/store';
import {NotificationService} from '@core/services/notification/notification.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['../auth-shared-styles.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
	changePwForm: FormGroup;
	password: FormControl = new FormControl('');
	new_password: FormControl = new FormControl('');
	verify_password: FormControl = new FormControl('');
	user: any;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _notify: NotificationService,
		private store: Store<{user: iUserState}>
	) { }

	ngOnInit(): void {
		this.buildFormGroup();
		this.store.select(state => state.user.data)
			.subscribe((user) => {
				this.user = user;
		});
	}

	ngOnDestroy() { }

	getErrorMessage(field: string) { }

	/**
	 * Create the FormGroup and update the changePwForm property
	 */
	buildFormGroup() {
		this.changePwForm = this._formBuilder.group({
			password: this.password,
			new_password: this.new_password,
			verify_password: this.verify_password
		});
	}

	/**
	 * Handler for clicking the cancel button
	 */
	onCancelClick() {
		this._router.navigateByUrl('/auth/user');
	}

	/**
	 * Handler for clicking the update button
	 */
	onUpdateClick() {
		this.store.dispatch(new ChangeUserPasswordAction(this.changePwForm.getRawValue()));
	}
}

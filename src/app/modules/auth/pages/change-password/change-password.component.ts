import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';
import {UiService} from '@core/services/ui/ui.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
	changePwForm: FormGroup;
	password: FormControl = new FormControl('');
	new_password: FormControl = new FormControl('');
	verify_password: FormControl = new FormControl('');
	user: any;

	constructor(
		private _formBuilder: FormBuilder,
		private _auth: AuthService,
		private _router: Router,
		private _ui: UiService
	) { }

	ngOnInit(): void {
		this.buildFormGroup();
		this.user = this._auth.getUser();
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
		const chgPwSub = this._auth.changePassword(this.changePwForm.getRawValue())
			.subscribe((resp) => {
				this._ui.notifyUserShowSnackbar(`Password successfully updated`);
				this._router.navigateByUrl('/auth/user');
				chgPwSub.unsubscribe();
			});
	}
}

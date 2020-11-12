import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['../auth-shared-styles.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
	forgotPwForm: FormGroup;
	email: FormControl = new FormControl('');
	new_password: FormControl = new FormControl('');
	verify_password: FormControl = new FormControl('');
	user: any;

	constructor(
		private _formBuilder: FormBuilder,
		private _auth: AuthService,
		private _router: Router
	) { }

	ngOnInit(): void {
		this.buildFormGroup();
		this.user = this._auth.getUser();
	}

	ngOnDestroy() { }

	getErrorMessage(field: string) {

	}

	/**
	 * Creates the FormGroup and populates the forgotPwForm property
	 */
	buildFormGroup() {
		this.forgotPwForm = this._formBuilder.group({
			email: this.email,
			new_password: this.new_password,
			verify_password: this.verify_password
		});
	}

	/**
	 * Click handler for the cancel button
	 */
	onCancelClick() {
		this._router.navigateByUrl('/auth/login');
	}

	/**
	 * Click handler for the Update button
	 */
	onUpdateClick() {
		this._auth.forgotPassword(this.forgotPwForm.getRawValue());
	}
}

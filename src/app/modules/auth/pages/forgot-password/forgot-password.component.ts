import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {iUserState} from '@core/root-store/models/app-state.model';
import {ForgotUserPasswordAction} from '@core/root-store/user/user.action';
import {Store} from '@ngrx/store';
import {User} from '@core/models/user.model';

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
		private _router: Router,
		private store: Store<{user: iUserState}>
	) { }

	ngOnInit(): void {
		this.buildFormGroup();
		this.store.select(store => store.user.data)
			.subscribe((user: User) => {
				this.user = user;
			});
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
		this.store.dispatch(new ForgotUserPasswordAction(this.forgotPwForm.getRawValue()));
	}
}

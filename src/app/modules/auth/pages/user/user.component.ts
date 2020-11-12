import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ErrorService} from '@core/services/error/error.service';
import {AuthService} from '@core/services/auth/auth.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['../auth-shared-styles.scss']
})
export class UserComponent implements OnInit, OnChanges {
	userData: FormGroup;
	email: FormControl = new FormControl('', [Validators.required, Validators.email]);
	password: FormControl = new FormControl('');
	verify_password: FormControl = new FormControl('');
	last_name: FormControl = new FormControl('', [Validators.required]);
	first_name: FormControl = new FormControl('', [Validators.required]);
	errorMsg: string;
	updateIsDisabled: boolean = true;
	projectName: string = PROJECT_NAME;
	subscriptions: Subscription = new Subscription();

	constructor(
		private _formBuilder: FormBuilder,
		private _auth: AuthService,
		private _error: ErrorService,
		private _router: Router
	) { }

	ngOnInit(): void {
		// Subscribe to the error service to catch the error
		this.subscriptions.add(this._error.errorEvent.subscribe((err: Error) => {
			this.errorMsg = err.message;
		}));
		this.buildFormGroup();
		this.userData.valueChanges.subscribe(val => {
			if (this.userData.dirty) {
				this.updateIsDisabled = false;
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log('ngOnChanges', changes);
	}

	/**
	 * Build the formGroup
	 */
	private buildFormGroup() {
		this.reset();
		this.userData = this._formBuilder.group({
			email: this.email,
			first_name: this.first_name,
			last_name: this.last_name,
			password: this.password,
			verify_password: this.verify_password
		});
	}

	/**
	 * Gets the validation message to show for each field
	 * @param {string} field
	 */
	getFieldErrorMessage(field: string) {
		if (field === 'email') {
			if (this.email.hasError('required')) {
				return 'You must provide an email address';
			} else if (this.email.hasError('email')) {
				return 'Please enter a valid email address (yourname@knowhere.com)';
			}
		} else {
			if (this[field].hasError('required')) {
				return `You must provide a ${field}`;
			}
		}
		return '';
	}

	/**
	 * Handler for updating user information
	 */
	update() {
		console.log('update user with', this.userData.getRawValue());
	}

	/**
	 * Reset the form to it's original values
	 */
	reset() {
		const userObj = this._auth.getUser();
		if (userObj) {
			this.email.setValue(userObj.email);
			this.first_name.setValue(userObj.first_name);
			this.last_name.setValue(userObj.last_name);
			this.password.setValue('');
			this.verify_password.setValue('');
		}
	}
}

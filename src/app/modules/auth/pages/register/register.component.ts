import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '@shared/models/user.model';
import {AuthService} from '@core/services/auth/auth.service';
import {ErrorService} from '@core/services/error/error.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../auth-shared-styles.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
	registrationData: FormGroup;
	email: FormControl = new FormControl('', [Validators.required, Validators.email]);
	password: FormControl = new FormControl('', [Validators.required]);
	verify_password: FormControl = new FormControl('', [Validators.required]);
	last_name: FormControl = new FormControl('', [Validators.required]);
	first_name: FormControl = new FormControl('', [Validators.required]);
	errorMsg: string;
	projectName: string = PROJECT_NAME;
	subscriptions: Subscription = new Subscription();

	constructor(
		private _formBuilder: FormBuilder,
		private _error: ErrorService,
		private _auth: AuthService,
		private _router: Router
	) { }

	ngOnInit(): void {
		// Subscribe to the error service to catch errors
		this.subscriptions.add(this._error.errorEvent.subscribe((err: Error) => {
			this.errorMsg = err.message;
		}));
		this.buildFormGroup();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Build the formGroup and set default values
	 */
	private buildFormGroup() {
		this.registrationData = this._formBuilder.group({
			email: this.email,
			password: this.password,
			first_name: this.first_name,
			last_name: this.last_name,
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
	 * Perform the registration
	 */
	register() {
		this.errorMsg = undefined;
		this.subscriptions.add(this._auth.register(this.registrationData.getRawValue())
			.subscribe((resp: User) => {
				this._router.navigateByUrl('/auth/user');
			}));
	}
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {iUserState} from '@core/root-store/models/app-state.model';
import {LoginUserAction} from '@core/root-store/user/user.action';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['../auth-shared-styles.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	loginData: FormGroup;
	email: FormControl = new FormControl('', [Validators.required, Validators.email]);
	password: FormControl = new FormControl('', [Validators.required]);
	errorMsg: string;
	projectName: string = PROJECT_NAME;
	subscriptions: Subscription = new Subscription();

	constructor(
		private _formBuilder: FormBuilder,
		private _error: AppErrorHandler,
		private _router: Router,
		private _notify: NotificationService,
		private store: Store<{user: iUserState}>
	) {
	}

	ngOnInit(): void {
		// Subscribe to the error service to catch errors
		this.subscriptions.add(this._error.errorEvent.subscribe((err: Error) => {
			this.errorMsg = err.message;
		}));
		this.store.select(store => store.user)
			.subscribe((state) => {
				if (state && state.data) {
					this._router.navigateByUrl('/');
				}
			});
		this.buildFormGroup();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Build the formGroup
	 */
	private buildFormGroup() {
		this.loginData = this._formBuilder.group({
			email: this.email,
			password: this.password
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
		} else if (field === 'password') {
			if (this.password.hasError('required')) {
				return 'You must provide a password';
			}
		}
		return '';
	}

	/**
	 * Perform the authentication
	 */
	loginClick() {
		this.store.dispatch(new LoginUserAction(this.loginData.getRawValue()));
		// this.subscriptions.add(this._auth.login(this.loginData.getRawValue())
		// 	.subscribe((user: User) => {
		// 		this._ui.notifyUserShowSnackbar(`Welcome to ${PROJECT_NAME}!`);
		// 		this._router.navigateByUrl('/auth/user');
		// 	}));
	}

	/**
	 * On keypress if the key is the enter key, perform the login
	 * @param evt {KeyboardEvent}
	 */
	onKeypress(evt: KeyboardEvent) {
		if (evt.key === 'Enter' && !this.loginData.invalid) {
			this.loginClick();
		}
	}
}

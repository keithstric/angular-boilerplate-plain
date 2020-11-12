import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorService} from '@core/services/error/error.service';
import {AuthService} from '@core/services/auth/auth.service';
import {UiService} from '@core/services/ui/ui.service';
import {MockAuthService, MockErrorService, MockUiService} from 'src/app/testing/mock-services';

import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				MatSnackBarModule
			],
			declarations: [LoginComponent],
			providers: [
				{provide: ErrorService, useClass: MockErrorService},
				{provide: AuthService, useClass: MockAuthService},
				{provide: UiService, useClass: MockUiService}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

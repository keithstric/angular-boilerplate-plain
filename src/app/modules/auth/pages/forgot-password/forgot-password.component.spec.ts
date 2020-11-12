import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {MockAuthService} from 'src/app/testing/mock-services';

import {ForgotPasswordComponent} from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [ForgotPasswordComponent],
			providers: [
				FormBuilder,
				{provide: AuthService, useClass: MockAuthService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

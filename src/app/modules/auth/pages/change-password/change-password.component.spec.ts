import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {UiService} from '@core/services/ui/ui.service';
import {MockAuthService, MockUiService} from 'src/app/testing/mock-services';

import {ChangePasswordComponent} from './change-password.component';

describe('ChangePasswordComponent', () => {
	let component: ChangePasswordComponent;
	let fixture: ComponentFixture<ChangePasswordComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [ChangePasswordComponent],
			providers: [
				FormBuilder,
				{provide: AuthService, useClass: MockAuthService},
				{provide: UiService, useClass: MockUiService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChangePasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

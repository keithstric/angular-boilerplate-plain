import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {StateObservable, Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {MockAuthService, MockUiService} from 'src/app/testing/mock-services';

import {ChangePasswordComponent} from './change-password.component';

describe('ChangePasswordComponent', () => {
	let component: ChangePasswordComponent;
	let fixture: ComponentFixture<ChangePasswordComponent>;
	const initialState = {
		user: {
			data: {
				_key: '605429',
				_id: 'people/605429',
				_rev: '_bdrJp_C--_',
				first_name: 'William',
				last_name: 'Strickland',
				email: 'keith.strickland@randstadusa.com',
				password: '$2b$13$XTy42M0WijOEHVF9MzfnquuHqs2uMCIJvBVulqoUcbvVpFFYXbS5q',
				created_date: '2020-11-19T14:38:32.189Z'
			},
			loading: false
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [ChangePasswordComponent],
			providers: [
				FormBuilder,
				{provide: AuthService, useClass: MockAuthService},
				{provide: NotificationService, useClass: MockUiService},
				provideMockStore({initialState})
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

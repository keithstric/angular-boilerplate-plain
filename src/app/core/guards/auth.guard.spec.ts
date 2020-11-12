import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {MockAuthService} from 'src/app/testing/mock-services';

import {AuthGuard} from './auth.guard';

describe('AuthGuard', () => {
	let guard: AuthGuard;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			providers: [
				{provide: AuthService, useClass: MockAuthService}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AuthGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

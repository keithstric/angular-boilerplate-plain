import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorService} from '@core/services/error/error.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {MockErrorService, MockHttpService, MockLocalStorageService} from 'src/app/testing/mock-services';

import {AuthService} from '@core/services/auth/auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				MatSnackBarModule,
				RouterTestingModule
			],
			providers: [
				{provide: HttpService, useClass: MockHttpService},
				{provide: LocalStorageService, useClass: MockLocalStorageService},
				{provide: ErrorService, useClass: MockErrorService}
			]
		});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorService} from '@core/services/error/error.service';
import {MockErrorService} from 'src/app/testing/mock-services';

import {HttpService} from './http.service';

describe('HttpService', () => {
	let service: HttpService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				RouterTestingModule
			],
			providers: [
				{provide: ErrorService, useClass: MockErrorService}
			]
		});
		service = TestBed.inject(HttpService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

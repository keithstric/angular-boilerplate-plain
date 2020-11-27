import {TestBed} from '@angular/core/testing';
import {NotificationService} from '@core/services/notification/notification.service';
import {MockUiService} from 'src/app/testing/mock-services';

import {ErrorService} from './error.service';

describe('ErrorService', () => {
	let service: ErrorService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{provide: NotificationService, useClass: MockUiService}
			]
		});
		service = TestBed.inject(ErrorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

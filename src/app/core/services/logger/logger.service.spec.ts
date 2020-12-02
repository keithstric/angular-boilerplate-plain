import {TestBed} from '@angular/core/testing';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';

import {LoggerService} from './logger.service';

describe('LoggerService', () => {
	let service: LoggerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				NotificationService,
				LoggerService,
				SnackBarRef
			]
		});
		service = TestBed.inject(LoggerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

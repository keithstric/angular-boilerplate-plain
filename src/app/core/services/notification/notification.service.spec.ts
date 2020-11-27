import {TestBed} from '@angular/core/testing';
import {ServiceWorkerModule, SwPush} from '@angular/service-worker';
import {environment} from 'src/environments/environment';

import {NotificationService} from './notification.service';

describe('UiService', () => {
	let service: NotificationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
			],
			providers: [
				SwPush
			]
		});
		service = TestBed.inject(NotificationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

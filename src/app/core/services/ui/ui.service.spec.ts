import {TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ServiceWorkerModule, SwPush} from '@angular/service-worker';
import {environment} from 'src/environments/environment';

import {UiService} from './ui.service';

describe('UiService', () => {
	let service: UiService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSnackBarModule,
				MatDialogModule,
				ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
			],
			providers: [
				SwPush
			]
		});
		service = TestBed.inject(UiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

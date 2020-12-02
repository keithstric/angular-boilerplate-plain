import {TestBed} from '@angular/core/testing';

import {DomInjectorService} from 'src/app/core/services/dom-injector/dom-injector.service';

describe('DomInjectorService', () => {
	let service: DomInjectorService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DomInjectorService
			]
		});
		service = TestBed.inject(DomInjectorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

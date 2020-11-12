import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderService} from '@layout/services/header/header.service';

import {BreadcrumbService} from './breadcrumb.service';

describe('BreadcrumbService', () => {
	let service: BreadcrumbService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			providers: [
				HeaderService
			]
		});
		service = TestBed.inject(BreadcrumbService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

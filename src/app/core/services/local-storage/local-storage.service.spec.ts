import {TestBed} from '@angular/core/testing';
import {LocalStorageTypes} from '@core/interfaces/local-storage.interface';
import {PROJECT_NAME} from 'src/environments/environment';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
	let service: LocalStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocalStorageService);
	});

	afterAll(() => {
		service.removeItem(LocalStorageTypes.LOCAL, 'foo');
		service.removeItem(LocalStorageTypes.SESSION, 'foo');
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set and remove localStorage and sessionStorage items', () => {
		service.setItem(LocalStorageTypes.LOCAL, 'foo', 'bar');
		expect(localStorage.getItem(`${PROJECT_NAME}:foo`)).toEqual('bar');
		service.setItem(LocalStorageTypes.SESSION, 'foo', 'bar');
		expect(sessionStorage.getItem(`${PROJECT_NAME}:foo`)).toEqual('bar');
		service.removeItem(LocalStorageTypes.LOCAL, 'foo');
		expect(localStorage.getItem(`${PROJECT_NAME}:foo`)).toBe(null);
		service.removeItem(LocalStorageTypes.SESSION, 'foo');
		expect(sessionStorage.getItem(`${PROJECT_NAME}:foo`)).toBe(null);
	});

	it('should get values from localStorage and sessionStorage', () => {
		service.setItem(LocalStorageTypes.LOCAL, 'foo', 'bar');
		expect(service.getItem(LocalStorageTypes.LOCAL, 'foo')).toEqual('bar');
		service.setItem(LocalStorageTypes.SESSION, 'foo', 'bar');
		expect(service.getItem(LocalStorageTypes.SESSION, 'foo')).toEqual('bar');
	});
});

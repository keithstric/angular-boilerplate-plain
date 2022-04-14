import {TestBed} from '@angular/core/testing';
import {LocalStorageTypes} from '@core/services/local-storage/local-storage.interface';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';

describe('LocalStorageService', () => {
	let service: LocalStorageService;
	// let localStore = {};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocalStorageService);

		// spyOn(localStorage, 'getItem').and.callFake((key) => {
		// 	return localStore[key];
		// });
		// spyOn(localStorage, 'setItem').and.callFake((key, value) => {
		// 	return localStore[key] = value + '';
		// });
		// spyOn(localStorage, 'removeItem').and.callFake(() => {
		// 	localStore = {};
		// });
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add items to localStorage', () => {
		const setItemLocalSpy = spyOn(localStorage, 'setItem');
		const setItemSessSpy = spyOn(sessionStorage, 'setItem');
		LocalStorageService.setItem(LocalStorageTypes.LOCAL, 'foo', 'bar');
		expect(setItemLocalSpy).toHaveBeenCalled();

		LocalStorageService.setItem(LocalStorageTypes.SESSION, 'foo', 'bar');
		expect(setItemSessSpy).toHaveBeenCalled();
	});

	it('should get items from localStorage', () => {
		const getItemLocalSpy = spyOn(localStorage, 'getItem');
		const getItemSessSpy = spyOn(sessionStorage, 'getItem');
		LocalStorageService.getItem(LocalStorageTypes.LOCAL, 'foo');
		expect(getItemLocalSpy).toHaveBeenCalled();

		LocalStorageService.getItem(LocalStorageTypes.SESSION, 'foo');
		expect(getItemSessSpy).toHaveBeenCalled();
	});

	it('should remove items from localStorage', () => {
		const removeItemLocalSpy = spyOn(localStorage, 'removeItem');
		const removeItemSessSpy = spyOn(sessionStorage, 'removeItem');
		LocalStorageService.removeItem(LocalStorageTypes.LOCAL, 'foo');
		expect(removeItemLocalSpy).toHaveBeenCalled();

		LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'foo');
		expect(removeItemSessSpy).toHaveBeenCalled();
	});
});

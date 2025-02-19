import {ComponentRef, EmbeddedViewRef, Injector} from '@angular/core';
import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {DomInjectorService} from '@core/services/dom-injector/dom-injector.service';
import {SnackbarConfig} from '@shared/components/snack-bar/snack-bar.interface';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';

describe('SnackBarRef', () => {
	let service: SnackBarRef;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				SnackBarRef,
				DomInjectorService
			]
		});
		service = TestBed.inject(SnackBarRef);
	}));

	beforeEach(inject([Injector], (injector) => {
		service['_injector'] = injector;
	}));

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add a config to the que', () => {
		// @ts-ignore
		const displaySpy = spyOn(service, '_displaySnackbar');
		const snackbarConfig: SnackbarConfig = {
			message: 'A test snackbar'
		};
		const compRef = service.show(snackbarConfig);
		expect(compRef).toBeTruthy();
		expect(service['snackbarsQue'].value).toBeTruthy();
		expect(service['snackbarsQue'].value.length).toBe(1);
		expect(displaySpy).toHaveBeenCalled();
	});

	/*it('should get the current snackbar dom element', () => {
		const snackbarConfig: SnackbarConfig = {
			message: 'A test snackbar'
		};
		const compRef: ComponentRef<any> = service.show(snackbarConfig);
		const domElem = service['_getDomElement']();
		expect((compRef.hostView as EmbeddedViewRef<any>).rootNodes[0]).toEqual(domElem);
	});*/

	it('should dismiss after 2 seconds', (done) => {
		const dismissSpy = spyOn(service, 'dismiss');
		const snackbarConfig: SnackbarConfig = {
			message: 'A test snackbar',
			duration: 2000
		};
		const compRef: ComponentRef<any> = service.show(snackbarConfig);
		expect(dismissSpy).not.toHaveBeenCalled();
		setTimeout(() => {
			expect(dismissSpy).toHaveBeenCalled();
			done();
		}, 2100);
	});
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';

import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
	let component: ConfirmDialogComponent;
	let fixture: ComponentFixture<ConfirmDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatDialogModule
			],
			declarations: [ConfirmDialogComponent],
			providers: [
				{provide: MatDialogRef, useValue: {}},
				{provide: MAT_DIALOG_DATA, useValue: {}}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should properly set the title text', () => {
		const title = 'Test title';
		component.data.title = title;
		fixture.detectChanges();
		const titleElem = fixture.debugElement.query(By.css('h1')).nativeElement;
		expect(titleElem.innerText).toBe(title);
	});

	it('should properly set the title Html', () => {
		const title = `<p>Html Title</p>`;
		component.data.titleHtml = title;
		fixture.detectChanges();
		const titleElem = fixture.debugElement.query(By.css('.dialogTitle')).nativeElement;
		expect(titleElem.innerHTML).toBe(title);
	});

	it('should properly set the content text', () => {
		const content = 'Content text';
		component.data.message = content;
		fixture.detectChanges();
		const contentElem = fixture.debugElement.query(By.css('.dialogMessage')).nativeElement;
		expect(contentElem.innerText).toBe(content);
	});

	it('should properly set the content html', () => {
		const content = '<p>Content html</p>';
		component.data.messageHtml = content;
		fixture.detectChanges();
		const contentElem = fixture.debugElement.query(By.css('.dialogMessage')).nativeElement;
		expect(contentElem.innerHTML).toBe(content);
	});

	it('should hide the cancel button', () => {
		component.data.noCancelButton = true;
		fixture.detectChanges();
		const cancelBtnElem = fixture.debugElement.nativeElement.querySelector('#cancelBtn');
		expect(cancelBtnElem).toBeFalsy();
	});

	it('should properly set button labels', () => {
		component.data.cancelButtonText = 'custom cancel';
		component.data.confirmButtonText = 'custom confirm';
		fixture.detectChanges();
		const cancelBtnElem = fixture.debugElement.nativeElement.querySelector('#cancelBtn');
		const confirmBtnElem = fixture.debugElement.nativeElement.querySelector('#confirmBtn');
		expect(cancelBtnElem.innerText).toBe('custom cancel');
		expect(confirmBtnElem.innerText).toBe('custom confirm');
	});

	it('should fire confirm handler', () => {
		const confirmHandlerSpy = spyOn(component, 'onActionClick');
		const confirmBtnElem = fixture.debugElement.nativeElement.querySelector('#confirmBtn');
		confirmBtnElem.click();
		expect(confirmHandlerSpy).toHaveBeenCalledWith(true);
	});

	it('should fire cancel handler', () => {
		const cancelHandlerSpy = spyOn(component, 'onActionClick');
		const cancelBtnElem = fixture.debugElement.nativeElement.querySelector('#cancelBtn');
		cancelBtnElem.click();
		expect(cancelHandlerSpy).toHaveBeenCalledWith(false);
	});
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';

import {SnackBarComponent} from './snack-bar.component';

describe('SnackBarComponent', () => {
	let component: SnackBarComponent;
	let fixture: ComponentFixture<SnackBarComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SnackBarComponent],
			providers: [
				SnackBarRef
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SnackBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

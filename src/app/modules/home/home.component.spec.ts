import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {MockUiService} from 'src/app/testing/mock-services';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [HomeComponent],
			providers: [
				{provide: NotificationService, useClass: MockUiService},
				SnackBarRef,
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

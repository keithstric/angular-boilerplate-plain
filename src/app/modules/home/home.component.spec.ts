import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UiService} from '@core/services/ui/ui.service';
import {MockUiService} from 'src/app/testing/mock-services';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HomeComponent],
			providers: [
				{provide: UiService, useClass: MockUiService}
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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PageNotFoundComponent} from '@layout/components/page-not-found/page-not-found.component';

describe('NotFoundComponent', () => {
	let component: PageNotFoundComponent;
	let fixture: ComponentFixture<PageNotFoundComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PageNotFoundComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

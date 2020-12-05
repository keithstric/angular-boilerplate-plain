import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PageBreadcrumbHeaderComponent} from './page-breadcrumb-header.component';

describe('PageBreadcrumbHeaderComponent', () => {
	let component: PageBreadcrumbHeaderComponent;
	let fixture: ComponentFixture<PageBreadcrumbHeaderComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PageBreadcrumbHeaderComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageBreadcrumbHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BreadcrumbService} from '@layout/services/breadcrumb/breadcrumb.service';

import {BreadcrumbsComponent} from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
	let component: BreadcrumbsComponent;
	let fixture: ComponentFixture<BreadcrumbsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [BreadcrumbsComponent],
			providers: [
				BreadcrumbService
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BreadcrumbsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

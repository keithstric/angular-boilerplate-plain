import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {HeaderService} from '@layout/services/header/header.service';
import {
	MockAuthService,
	MockHeaderService,
	MockHttpService,
	MockLocalStorageService
} from 'src/app/testing/mock-services';

describe('SiteHeaderComponent', () => {
	let component: SiteHeaderComponent;
	let fixture: ComponentFixture<SiteHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			declarations: [
				SiteHeaderComponent
			],
			providers: [
				{provide: HeaderService, useClass: MockHeaderService},
				{provide: LocalStorageService, useClass: MockLocalStorageService},
				{provide: HttpService, useClass: MockHttpService},
				{provide: AuthService, useClass: MockAuthService}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SiteHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

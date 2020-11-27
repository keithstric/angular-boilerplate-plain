import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {StateObservable, Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {
	MockAuthService,
	MockHeaderService,
	MockHttpService,
	MockLocalStorageService
} from 'src/app/testing/mock-services';

describe('SiteHeaderComponent', () => {
	let component: SiteHeaderComponent;
	let fixture: ComponentFixture<SiteHeaderComponent>;
	const initialState = {
		user: {
			data: {
				_key: '605429',
				_id: 'people/605429',
				_rev: '_bdrJp_C--_',
				first_name: 'William',
				last_name: 'Strickland',
				email: 'capt.jack.sparrow@eastindiatradingcompany.com',
				password: '$2b$13$XTy42M0WijOEHVF9MzfnquuHqs2uMCIJvBVulqoUcbvVpFFYXbS5q',
				created_date: '2020-11-19T14:38:32.189Z'
			},
			loading: false
		}
	};

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
				{provide: LocalStorageService, useClass: MockLocalStorageService},
				{provide: HttpService, useClass: MockHttpService},
				{provide: AuthService, useClass: MockAuthService},
				provideMockStore({initialState})
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

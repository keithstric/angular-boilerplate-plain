import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorService} from '@core/services/error/error.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {StateObservable, Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {MockErrorService, MockHttpService, MockLocalStorageService} from 'src/app/testing/mock-services';

import {RegisterComponent} from './register.component';

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;
	const initialState = {
		user: {
			data: {
				_key: '605429',
				_id: 'people/605429',
				_rev: '_bdrJp_C--_',
				first_name: 'William',
				last_name: 'Strickland',
				email: 'keith.strickland@randstadusa.com',
				password: '$2b$13$XTy42M0WijOEHVF9MzfnquuHqs2uMCIJvBVulqoUcbvVpFFYXbS5q',
				created_date: '2020-11-19T14:38:32.189Z'
			},
			loading: false
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				HttpClientTestingModule,
				RouterTestingModule
			],
			declarations: [RegisterComponent],
			providers: [
				{provide: ErrorService, useClass: MockErrorService},
				{provide: LocalStorageService, useClass: MockLocalStorageService},
				{provide: HttpService, useClass: MockHttpService},
				provideMockStore({initialState})
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

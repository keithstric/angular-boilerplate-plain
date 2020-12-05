import { TestBed, waitForAsync } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActionsSubject, ReducerManager, StateObservable, Store, StoreModule} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {PROJECT_NAME} from 'src/environments/environment';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
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

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule
			],
			declarations: [
				AppComponent
			],
			providers: [
				provideMockStore({initialState})
			]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title ${PROJECT_NAME}`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual(PROJECT_NAME);
	});

});

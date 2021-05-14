import {TestBed} from '@angular/core/testing';

import {LoadingService} from '@layout/services/loading/loading.service';
import {ActionsSubject, ReducerManager, StateObservable, Store, StoreModule} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';

describe('LoadingService', () => {
	let service: LoadingService;
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

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule
			],
			providers: [
				provideMockStore({initialState})
			]
		});
		service = TestBed.inject(LoadingService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should update the loading map', () => {
		// service.setLoading(true, '/foo/bar');
		// expect(service.loadingMap.get('/foo/bar')).toBe(true);
		// expect(service.loadingSub.value).toBe(true);
		// service.setLoading(false, '/foo/bar');
		// expect(service.loadingMap.size).toBe(0);
		// expect(service.loadingSub.value).toBe(false);
	});
});

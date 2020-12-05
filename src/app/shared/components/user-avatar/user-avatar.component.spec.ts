import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {AuthService} from '@core/services/auth/auth.service';
import {provideMockStore} from '@ngrx/store/testing';
import {MockAuthService} from 'src/app/testing/mock-services';

import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';

describe('UserAvatarComponent', () => {
	let component: UserAvatarComponent;
	let fixture: ComponentFixture<UserAvatarComponent>;
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
			declarations: [UserAvatarComponent],
			providers: [
				{provide: AuthService, useClass: MockAuthService},
				provideMockStore({initialState})
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserAvatarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

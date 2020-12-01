import {SwPush} from '@angular/service-worker';
import {provideMockStore} from '@ngrx/store/testing';
import {moduleMetadata} from '@storybook/angular';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';
import {AuthService} from '@core/services/auth/auth.service';
import {MockStorybookNoUserAvatarComponent, MockStorybookUserAvatarComponent} from 'src/app/testing/mock-components';
import {MockAuthService} from 'src/app/testing/mock-services';

// @ts-ignore
import docs from '@shared/components/user-avatar/README.md';

const initialState = {
	user: {
		data: {
			_key: '605429',
			_id: 'people/605429',
			_rev: '_bdrJp_C--_',
			first_name: 'Jack',
			last_name: 'Sparrow',
			email: 'capt.jack.sparrow@eastindiatradingcompany.com',
			password: '$2b$13$XTy42M0WijOEHVF9MzfnquuHqs2uMCIJvBVulqoUcbvVpFFYXbS5q',
			avatar: 'data:image/jpeg;base64,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',
			created_date: '2020-11-19T14:38:32.189Z'
		},
		loading: false,
		foo: 'bar'
	}
};

export default {
	title: 'app-user-avatar',
	decorators: [
		moduleMetadata({
			imports: [],
			declarations: [UserAvatarComponent, MockStorybookNoUserAvatarComponent],
			providers: [
				{provide: AuthService, useClass: MockAuthService},
				provideMockStore({initialState}),
				SwPush
			]
		})
	],
	parameters: {
		notes: {markdown: docs},
		backgrounds: [
			{name: 'primary', value: '#3F51B5', default: true}
		]
	}
};

export const small = () => ({
	component: UserAvatarComponent,
	template: `<div style="width: 48px; height: 48px;">
			<app-user-avatar class="small"></app-user-avatar>
		</div>`
});

export const medium = () => ({
	component: UserAvatarComponent,
	template: `<div style="width: 48px; height: 48px;">
			<app-user-avatar class="medium"></app-user-avatar>
		</div>`
});

export const large = () => ({
	component: UserAvatarComponent,
	template: `<div style="width: 48px; height: 48px;">
			<app-user-avatar class="large"></app-user-avatar>
		</div>`
});

export const huge = () => ({
	component: UserAvatarComponent,
	template: `<div style="width: 48px; height: 48px;">
			<app-user-avatar class="huge"></app-user-avatar>
		</div>`
});

export const noUser = () => ({
	component: MockStorybookNoUserAvatarComponent,
	template: `<div style="width: 48px; height: 48px;">
			<app-mock-no-user-avatar></app-mock-no-user-avatar>
		</div>`
});

export const clickEventNoAvatar = () => ({
	component: MockStorybookUserAvatarComponent
});

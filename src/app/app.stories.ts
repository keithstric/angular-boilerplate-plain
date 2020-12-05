import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import {moduleMetadata} from '@storybook/angular';
import {AppComponent} from 'src/app/app.component';
import {AppModule} from 'src/app/app.module';

// @ts-ignore
import appNotes from '../../README.md';

export default {
	title: 'App',
	component: AppComponent,
	decorators: [
		moduleMetadata({
			imports: [
				AppModule,
				RouterModule.forRoot([
					{path: '', loadChildren: () => import('./app.module').then(m => m.AppModule)}
				], {
					useHash: true
				})
			],
			providers: [
				{provide: APP_BASE_HREF, useValue: '/'}
			]
		})
	],
	controls: {hideNoControlsWarning: true}
};

export const defaultApp = () => ({
	component: AppComponent
});


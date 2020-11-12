import {RouterTestingModule} from '@angular/router/testing';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {moduleMetadata} from '@storybook/angular';
import {MaterialModule} from '@core/modules/material.module';
import {BreadcrumbsComponent} from '@layout/components/breadcrumbs/breadcrumbs.component';
import {MockStorybookPageBreadcrumbHeaderComponent} from 'src/app/testing/mock-components';

// @ts-ignore
import pageBreadcrumbHeaderNotes from './README.md';

export default {
	title: 'app-page-breadcrumb-header',
	decorators: [
		moduleMetadata({
			imports: [
				MaterialModule,
				RouterTestingModule
			],
			declarations: [
				MockStorybookPageBreadcrumbHeaderComponent,
				BreadcrumbsComponent
			]
		}),
		withKnobs
	],
	parameters: {
		notes: {markdown: pageBreadcrumbHeaderNotes},
		backgrounds: [
			{name: 'primary', value: '#f5f5f5', default: true}
		]
	}
};

export const defaultHeader = () => ({
	component: MockStorybookPageBreadcrumbHeaderComponent,
	props: {
		showAddButton: boolean('showAddButton', false)
	}
});

export const withAddButton = () => ({
	component: MockStorybookPageBreadcrumbHeaderComponent,
	props: {
		showAddButton: boolean('showAddButton', true)
	}
});

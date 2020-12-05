import {RouterTestingModule} from '@angular/router/testing';
import {moduleMetadata} from '@storybook/angular';
import {BreadcrumbsComponent} from '@layout/components/breadcrumbs/breadcrumbs.component';
import {MockStorybookPageBreadcrumbHeaderComponent} from 'src/app/testing/mock-components';

// @ts-ignore
import pageBreadcrumbHeaderNotes from './README.md';

export default {
	title: 'app-page-breadcrumb-header',
	component: MockStorybookPageBreadcrumbHeaderComponent,
	decorators: [
		moduleMetadata({
			imports: [
				RouterTestingModule
			],
			declarations: [
				MockStorybookPageBreadcrumbHeaderComponent,
				BreadcrumbsComponent
			]
		}),
	]
};

export const defaultHeader = (args) => ({
	component: MockStorybookPageBreadcrumbHeaderComponent,
	props: args
});
defaultHeader.args = {showAddButton: false};

export const withAddButton = (args) => ({
	component: MockStorybookPageBreadcrumbHeaderComponent,
	props: args
});
withAddButton.args = {showAddButton: true};

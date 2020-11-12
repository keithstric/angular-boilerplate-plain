import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {withKnobs} from '@storybook/addon-knobs';
import {moduleMetadata} from '@storybook/angular';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '@core/modules/material.module';
import {MockStorybookDialogContentComponent, MockStorybookOpenDialogComponent} from 'src/app/testing/mock-components';

// @ts-ignore
import confirmDialogNotes from '@shared/components/confirm-dialog/README.md';

// Module configuration for the stories
export default {
	title: 'confirm-dialog',
	decorators: [
		moduleMetadata({
			imports: [
				MaterialModule,
				BrowserAnimationsModule
			],
			declarations: [
				MockStorybookDialogContentComponent,
				MockStorybookOpenDialogComponent,
				ConfirmDialogComponent
			],
			entryComponents: [
				ConfirmDialogComponent,
				MockStorybookDialogContentComponent
			]
		}),
		withKnobs
	],
	parameters: {
		notes: {markdown: confirmDialogNotes},
		backgrounds: [
			{name: 'primary', value: '#f5f5f5', default: true}
		]
	}
};

export const baseConfirmDialog = () => ({
	component: MockStorybookOpenDialogComponent
});

export const confirmDialogWithTitle = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {title: 'Custom Title'}
	}
});

export const confirmDialogWithTitleAndMessage = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			title: 'Custom Title',
			message: 'This is a custom message'
		}
	}
});

export const confirmDialogNoCancelButton = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			title: 'No Cancel Button',
			message: 'This is a custom message',
			noCancelButton: true
		}
	}
});

export const confirmDialogCustomActionNames = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			title: 'Custom Action Names',
			cancelButtonText: 'Custom Cancel',
			confirmButtonText: 'Custom Confirm'
		}
	}
});

export const confirmDialogHtmlMessage = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			title: 'Display HTML as the message',
			messageHtml:
				`<p>This is an <b>HTML message</b> with a pre block</p>
				<pre>
					${JSON.stringify({data: {title: 'Display HTML as the message'}}, null , 2)}
				</pre>`
		}
	}
});

export const confirmDialogHtmlTitle = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			titleHtml: '<h1 class="header">Display HTML as the title</h1><div class="subheading">A Subheading</div>'
		}
	}
});

export const confirmDialogComponentMessage = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			title: 'Display Component as message',
			messageComponent: MockStorybookDialogContentComponent
		}
	}
});

export const confirmDialogTemplateMessage = () => ({
	component: MockStorybookOpenDialogComponent,
	props: {
		data: {
			title: 'Display an ng-template as the message',
			messageTemplate: 'exampleTemplate from MockStorybookOpenDialogComponent'
		}
	}
});


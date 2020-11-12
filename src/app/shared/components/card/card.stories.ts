import {withKnobs, text} from '@storybook/addon-knobs';
import {moduleMetadata} from '@storybook/angular';
import { CardComponent } from '@shared/components/card/card.component';
import {MaterialModule} from '@core/modules/material.module';
import '@storybook/addon-console';

// @ts-ignore
import cardNotes from '@shared/components/card/README.md';

export default {
	title: 'app-card',
	decorators: [
		moduleMetadata({
			imports: [MaterialModule],
			declarations: [CardComponent]
		}),
		withKnobs
	],
	parameters: {
		notes: {markdown: cardNotes},
		backgrounds: [
			{name: 'primary', value: '#f5f5f5', default: true}
		]
	}
};

export const basicCardComponent = () => ({
	component: CardComponent,
	props: {
		cardTitle: text('cardTitle', 'Story Card Title'),
		cardSubTitle: text('cardSubTitle', 'Story Card Sub-Title')
	}
});

export const withContent = () => ({
	component: CardComponent,
	props: {
		title: text('cardTitle', 'Story Card Title'),
		subTitle: text('cardSubTitle', 'Story Card Sub-Title'),
		content: 'Here is a content div'
	},
	template: `
		<app-card [cardTitle]="title" [cardSubTitle]="subTitle">
			<div content>{{content}}</div>
		</app-card>
	`
});

export const withActions = () => ({
	component: CardComponent,
	props: {
		title: text('cardTitle', 'Story Card Title'),
		subTitle: text('cardSubTitle', 'Story Card Sub-Title'),
		content: 'Here is a content div'
	},
	template: `
		<app-card [cardTitle]="title" [cardSubTitle]="subTitle">
			<div content>{{content}}</div>
			<div actions>
				<button mat-raised-button style="margin-right: 10px;">Action 1</button>
				<button mat-raised-button primary>Action 2</button>
			</div>
		</app-card>
	`
});

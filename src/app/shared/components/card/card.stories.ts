import {CardComponent} from '@shared/components/card/card.component';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {moduleMetadata} from '@storybook/angular';

export default {
	title: 'app-card',
	decorators: [
		moduleMetadata({
			declarations: [CardComponent]
		})
	],
	withKnobs,
	parameters: {
		backgrounds: [
			{name: 'primary', value: '#efefef', default: true}
		]
	}
};

export const defaultCard = () => ({
	component: CardComponent,
	props: {
		withBorder: boolean('withBorder', false),
		raised: boolean('raised', false)
	}
});

export const withContent = () => ({
	component: CardComponent,
	template: `<app-card [withBorder]="true" [raised]="true">
			<div header>Header</div>
			<div content>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
			</div>
			<div actions>
				<button>button 1</button>
				<button>button 2</button>
			</div>
			<div footer>Footer</div>
		</app-card>`
});

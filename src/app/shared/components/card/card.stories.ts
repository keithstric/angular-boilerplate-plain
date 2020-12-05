import {CardComponent} from '@shared/components/card/card.component';
import {moduleMetadata} from '@storybook/angular';

export default {
	title: 'app-card',
	component: CardComponent,
	decorators: [
		moduleMetadata({
			declarations: [CardComponent]
		})
	]
};

export const defaultCard = () => ({
	component: CardComponent,
	args: {withBorder: true, raised: false}
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

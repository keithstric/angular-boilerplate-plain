import {setCompodocJson} from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

export const parameters = {
	controls: { expanded: true },
	backgrounds: {
		default: 'gray',
		values: [
			{
				name: 'twitter',
				value: '#00aced',
			},
			{
				name: 'facebook',
				value: '#3b5998',
			},
			{
				name: 'gray',
				value: '#f1f1f1',
			},
		],
	},
};

const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
  	'@storybook/addon-actions',
		'@storybook/addon-knobs',
		'@storybook/addon-links',
		'@storybook/addon-notes',
		'@storybook/addon-backgrounds',
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					include: [path.resolve(__dirname, '../src')]
				},
				loaderOptions: {
					parser: 'typescript',
					prettierConfig: {
						printWidth: 100,
						tabWidth: 2,
						bracketSpacing: true,
						singleQuote: true
					}
				},
				enforce: 'pre'
			}
		}
	]
};

const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|js)'],
  addons: [{
    name: '@storybook/addon-essentials'
  }, {
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
  }],
  core: {
    builder: "webpack5"
  }
};
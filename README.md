# Angular Boilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6. This is purely a boilerplate with authentication pages. I think mainly is an example layout more than anything else as there isn't a defined backend.

The folder structure of this project was inspired by [this video](https://www.youtube.com/watch?v=WA95EJGhbLc&t=1s).

## Features

* Dynamic loading spinner
* Authentication Guard
* Some base components (card, confirm dialog, user-avatar)
* local/session storage
* Push and toaster Notification support
* Dynamic model implementation (use user.model.ts as an example)
* Base application layout
* Service Worker implementation
* Base scss flexbox classes, various scss mixins and theme implementation
* Testing infrastructure
* Global Error Handling
* [compodoc](https://compodoc.app/) implementation
* Uses [Angular Material](https://material.angular.io/) for theming
* [Storybook](https://storybook.js.org) already setup and working

## Things to change

Upon first configuration you will want to change the following items:

* `package.json` - The name field. This is used to drive the site title, header title and localStorage/sessionStorage prefix. I've made this a template on GitHub so this step may not be required.
* `src/environments/environment*.ts` - Update the Notifications Server public key variable. This is to support push notifications. Leave it blank if push notifications are not going to be used
* `src/app/core/interfaces/api.interface.ts` - Update the `ApiEndpoints` enum to match your routes

## Custom npm scripts

* `compodoc` - Generate [compodoc documentation](https://compodoc.app/)
* `start-dist-server` - Run `build` then start an [http-server](https://www.npmjs.com/package/http-server) pointed to the `dist` directory
* `storybook` - Start the [storybook](https://storybook.js.org) application

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

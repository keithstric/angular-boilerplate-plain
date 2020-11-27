# Angular Boilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6. This is purely a boilerplate with authentication pages. I think mainly is an example layout more than anything else as there isn't a defined backend.

The folder structure of this project was inspired by [this video](https://www.youtube.com/watch?v=WA95EJGhbLc&t=1s).

## Features

* Included [@ngrx/store](https://ngrx.io/guide/store) and [@ngrx/effects](https://ngrx.io/guide/effects) - Angular Redux implementation
* Dynamic loading spinner - Shown during any and all http requests
* Authentication Guard
* Some base components (card, confirm dialog, user-avatar)
* local/session storage with pre-configured prefix (`name` from `package.json`)
* Dynamic model implementation (use `user.model.ts` as an example)
* Base application layout with a dynamic sidebar, header and footer
* Service Worker implementation
* Base scss flexbox classes, various scss mixins and theme implementation
* Testing infrastructure
* Global Error Handling
* Lazy loading of feature modules
* [compodoc](https://compodoc.app/) implementation
* [Storybook](https://storybook.js.org) already setup and working

## Getting Started

Since this repository is a template, you may want to use the template to create your project repository if storing your source code on GitHub.
See: [Creating a repository from a template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

If not storing your source code on GitHub use:

```
git clone https://github.com/keithstric/angular-boilerplate-plain new-project
cd new-project
npm install
npm start
```

## Useful Commands

* `npm start` - starts a dev server and opens browser with running app on port 4201
* `npm run build` -  Build the production project. The build artifacts will be stored in the `dist/` directory.
* `npm run test` - Execute the unit tests via [Karma](https://karma-runner.github.io)
* `npm run e2e` - Execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
* `npm run lint` - Execute lint testing
* `npm run compodoc` - Generate [compodoc documentation](https://compodoc.app/)
* `npm run start-dist-server` - Run `build` then start an [http-server](https://www.npmjs.com/package/http-server) pointed to the `dist` directory
* `npm run storybook` - Start the [storybook](https://storybook.js.org) application

## Configure for _your_ use case

Upon first configuration you will want to change the following items:

* `package.json` - The name field. This is used to drive the site title, header title and localStorage/sessionStorage prefix. If you create your project from the template on GitHub, this step may not be required.
* `src/environments/environment*.ts` - Update the Notifications Server public key variable. This is to support push notifications. Leave it blank if push notifications are not going to be used
* `src/app/core/interfaces/api.interface.ts` - Update the `ApiEndpoints` enum to match your routes
* If not using Breadcrumbs delete: `src/app/layout/components/breadcrumbs`, `src/app/layout/components/page-breadcrumb-header` and `src/app/layout/services/breadcrumb`
* Modify `proxy.conf.json` to match your backend api location and port
* Modify `src/scss/theme.scss` to meet your theming needs

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

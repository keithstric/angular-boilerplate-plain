```
   #                                                 ######
  # #   #    #  ####  #    # #        ##   #####     #     #  ####  # #      ###### #####  #####  #        ##   ##### ######
 #   #  ##   # #    # #    # #       #  #  #    #    #     # #    # # #      #      #    # #    # #       #  #    #   #
#     # # #  # #      #    # #      #    # #    #    ######  #    # # #      #####  #    # #    # #      #    #   #   #####
####### #  # # #  ### #    # #      ###### #####     #     # #    # # #      #      #####  #####  #      ######   #   #
#     # #   ## #    # #    # #      #    # #   #     #     # #    # # #      #      #   #  #      #      #    #   #   #
#     # #    #  ####   ####  ###### #    # #    #    ######   ####  # ###### ###### #    # #      ###### #    #   #   ######
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3. This is purely a boilerplate with authentication pages. I think mainly is an example layout more than anything else as there isn't a defined backend.

The folder structure of this project was inspired by [this video](https://www.youtube.com/watch?v=WA95EJGhbLc&t=1s).

## Project Goals

* Basic Angular implementation (no layout/styling packages like material or bootstrap)
* Provide useful base features that can be used in any project (i.e. loading spinner, http requests, error handling, etc.)
* Speed up process of spinning up a new application
* Make it easy to arrange and find code

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
* HTTP Route cache
* [compodoc](https://compodoc.app/) implementation
* Dynamic Form implementation
* Handy directives for updating an ngrx-store and maintaining checkbox group values

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

Be sure to remove the .git directory and add it to your source control.

## Useful Commands

* `npm start` - starts a dev server and opens browser with running app on port 4201
* `npm run build` -  Build the production project. The build artifacts will be stored in the `dist/` directory.
* `npm run test` - Execute the unit tests via [Karma](https://karma-runner.github.io)
* `npm run e2e` - Execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
* `npm run lint` - Execute lint testing
* `npm run compodoc` - Generate [compodoc documentation](https://compodoc.app/)
* `npm run start-dist-server` - Run `build` then start an [http-server](https://www.npmjs.com/package/http-server) pointed to the `dist` directory

## Configure for _your_ use case

Upon first configuration you may want to change all or some of the following items:

* `package.json` - The name field. This is used to drive the site title, header title and localStorage/sessionStorage prefix. If you create your project from the template on GitHub, this step may not be required.
* `src/app/core/interfaces/api.interface.ts` - Update the `ApiEndpoints` enum, `CachableRoutePatters` and `ApiRouteToClass` constants to match your routes
* Modify `proxy.conf.json` to match your backend api location and port. You can delete this file if there is no need to proxy routes. Be sure to update `angular.json` if you delete this file
* If not using Breadcrumbs delete: `src/app/layout/components/breadcrumbs`, `src/app/layout/components/page-breadcrumb-header` and `src/app/layout/services/breadcrumb`
* Modify `src/scss/theme.scss` to meet your theming needs
* Update items in `src/app/modules/auth` and `src/app/core/services/auth/auth.service.ts` for your authentication needs

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

If creating a new module and you include a variable for the components which will be in the `declarations` and `exported` properties of the module with a spread operator. Be sure you make your variable name unique so that compodoc will properly recognize the items in the variable. If you use a variable name that is the same across multiple modules, compodoc will show the wrong exports and declarations.

Example:

_shared.module.ts_
```javascript
const components = [CardComponent];
@NgModule({
	delarations: [...components],
	exports: [...components]
})
```

_layout.module.ts_
```javascript
const components = [SiteHeaderComponent];
@NgModule({
	delarations: [...components],
	exports: [...components]
})
```

In the example above, compodoc will show the components declared in `layout.module.ts` as exported in the `shared.module.ts` file. However, uniquely naming the components variables will fix this issue.

_shared.module.ts_
```javascript
const sharedComponents = [CardComponent];
@NgModule({
	delarations: [...sharedComponents],
	exports: [...sharedComponents]
})
```

_layout.module.ts_
```javascript
const layoutComponents = [SiteHeaderComponent];
@NgModule({
	delarations: [...layoutComponents],
	exports: [...layoutComponents]
})
```

## Using Dynamic Header/Footer/Sidebar

You may need to display different header, footer and/or sidebar as a user navigates your application. This can be accomplished via the `LayoutService` which provides helper methods to set the layout area appropriately.

To change the displayed header/footer/sidebar include the `LayoutService` in your component as an injected dependency. This functionality can be included in a route listener, button click or wherever you like as the change is immediate.

### Caveat:

Since the `LayoutService` is a singleton, changing these layout areas does persist between route changes. So you will need to reset the layout area in `ngOnDestroy` or in the `ngOnInit` of the target page.

Example:

```typescript
origHeader: any;
origFooter: any;
origSidebar: any;

constructor(private _layout: LayoutService) {}

ngOnInit() {
	this.origHeader = this._layout.headerSource.value;
	this.origFooter = this._layout.footerSource.value;
	this.origSidebar = this._layout.sidebarSource.value;
	this._layout.setHeader(CustomHeaderComponent);
	this._layout.setFooter(CustomFooterComponent);
	this._layout.setSidebar(CustomSidebarComponent);
}

ngOnDestroy() {
	this._layout.setHeader(this.origHeader);
	this._layout.setFooter(this.origFooter);
	this._layout.setSidebar(this.origSidebar);
}
```

## Naming Conventions

* "core" - Things needed to load the layout, authenticate and system level services
* "modules" - This kind of has 2 meanings:
    1) Where custom or 3rd party module files are located
    2) Where top level features are located
* "layout" - The base application UI structure (where the header, sidebar, footer and content area are). NOT the content shown in the layout.
* "shared" - This is where components, services, models, interfaces, etc are located which are used across many features
* "page" - This would be a top level component which has it's own route

## Undecided Items/Topics

* Where should individual components reside in context to a feature/module? My observations so far are:
    1) Some companies use something like `src/app/modules/some-feature/pages/some-page` for parent components and then all components specifically for that feature are stored in `src/app/modules/some-feature/components` - _I feel this would be the easiest way to find code_
    2) Some companies use something like `src/app/modules/some-feature/components/some-page` for parent components and then all components  specifically for that feature are stored in `src/app/modules/some-feature/components/some-page/some-component` and that is carried on for an undetermined depth - _I think this makes it difficult to find code_

## Contributing

If you would like to contribute to this project just send a pull request. Please ensure you create tests to represent your change and keep to the code styles defined in `.editorconfig`.

# app-page-breadcrumb-header

This is a header that should go somewhere within a page that will display the route breadcrumbs. This is not meant to be a site header.ß

## Usage

```html
<app-page-breadcrumb-header [showAddButton]="true" (addButtonClick)="someMethod()"></app-page-breadcrumb-header>
```
```javascript
someMethod() {
  console.log('PageBreadcrumbHeader, add button clicked');
}
```

## Properties

* showAddButton - Boolean - If the header is on a page with a list, set this to true to allow adding a new list entry

## Events

* addButtonClick - Fired when the add button is clicked

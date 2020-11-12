# confirm-dialog-component

This is a basic confirm dialog component

## Usage

```javascript
constructor(
    public dialog: MatDialog
) {}

openDialog() {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: 'foo', message: 'foo bar?': noCancelButton: false}});
  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed', result);
  });
}
```

### Using from the UI Service

```javascript
constructor(
  private _ui: UiService
) {}

openDialog() {
  const dialogRef = this._ui.notifyUserShowConfirmDialog({
    message: 'foo bar?',
    title: 'foo',
    noCancelButton: true
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed', result);
  });
}
```

### HTML Title Considerations

If defining an HTML title (`messageHtml`). A heading element (h1,h2,h3,h4,h5,h6) with a class of "header" will have the bottom margin removed.

Likewise, defining a div with a class of "subheading" will style the content with a smaller font and opacity set to 0.7.

#### Example
```typescipt
const dialogConfig = {
    data: {
        titleHtml: `<h1 class="header">Some Title</h1><div class="subheading">Sub Heading</div>`
    }
}
```

## ConfirmDialogData Interface

```typescript
export interface ConfirmDialogData {
	/**
	 * The title of the dialog
	 */
	title?: string;
	/**
	 * Include an HTML string to display as the title
	 */
	titleHtml?: string;
	/**
	 * The message displayed in the dialog
	 */
	message?: string;
	/**
	 * Include an HTML string to display as the message
	 */
	messageHtml?: string;
	/**
	 * Include an ng-template to display as the message
	 */
	messageTemplate?: TemplateRef<any>;
	/**
	 * Include a Component to display as the message
	 */
	messageComponent?: any;
	/**
	 * Set to `true` to hide the cancel button
	 */
	noCancelButton?: boolean;
	/**
	 * The text for the cancel button
	 */
	cancelButtonText?: string;
	/**
	 * The text for the confirm button
	 */
	confirmButtonText?: string;
}
```

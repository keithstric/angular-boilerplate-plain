/**
 * The parts of a ConfirmDialogComponent
 */
import {TemplateRef} from '@angular/core';

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

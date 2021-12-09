import {TemplateRef, Type} from '@angular/core';
import {FormGroup} from '@angular/forms';

export interface ConfirmModalConfig {
	/**
	 * The text which will show in the modal-header
	 */
	modalHeaderText?: string;
	/**
	 * The title text of the modal
	 */
	modalTitle?: string;
	/**
	 * The title html of the modal (inside the h2 block)
	 */
	modalTitleHtml?: string;
	/**
	 * The Subheading text for the modal
	 */
	modalSubHeading?: string;
	/**
	 * the Subheading html for the modal (inside the h6 block)
	 */
	modalSubHeadingHtml?: string;
	/**
	 * HTML content to display in the body
	 */
	modalHtmlContent?: string;
	/**
	 * Text content to display in the body
	 */
	modalTextContent?: string;
	/**
	 * An ng-template to display in the body
	 */
	modalTemplateContent?: TemplateRef<any>;
	/**
	 * A component to display in the body
	 */
	modalComponentContent?: Type<any>;
	/**
	 * The initial state of the modalComponentContent component
	 */
	modalComponentContentInitialState?: any;
	/**
	 * True to hide the cancel button
	 */
	hideCancelButton?: boolean;
	/**
	 * True to hide the confirm button
	 */
	hideConfirmButton?: boolean;
	/**
	 * The label for the cancel button
	 */
	cancelButtonLabel?: string;
	/**
	 * The label for the confirm button
	 */
	confirmButtonLabel?: string;
	/**
	 * any data item that may need to be returned
	 */
	data?: any;
	/**
	 * Provide a FormGroup to provide ability to disable the confirm button
	 */
	formGroup?: FormGroup;
	/**
	 * true to close after confirm handler has been run. Default true
	 */
	closeOnConfirm?: boolean;
	/**
	 * true to close after cancel handler has been run. Default true
	 */
	closeOnCancel?: boolean;
	/**
	 * Handler function to run when the cancel button is clicked
	 */
	cancelHandler?(): void;
	/**
	 * Handler function to run when the confirm button is clicked
	 */
	confirmHandler?(): void;
	/**
	 * handler function to run when the modal's close button is clicked
	 */
	closeHandler?(): void;
}

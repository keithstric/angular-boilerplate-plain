import {Component, ComponentFactoryResolver, Injector, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ViewRefDirective} from '@shared/directives/view-ref/view-ref.directive';

@Component({
	selector: 'app-confirm-modal',
	templateUrl: './confirm-modal.component.html',
	styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
	modalHeaderText: string;
	modalTitle: string;
	modalTitleHtml: string;
	modalSubHeading: string;
	modalSubHeadingHtml: string;
	modalHtmlContent: string;
	modalTextContent: string;
	modalTemplateContent: TemplateRef<any>;
	modalComponentContent: Type<any>;
	modalComponentContentInitialState: any;
	hideCancelButton: boolean = false;
	hideConfirmButton: boolean = false;
	cancelButtonLabel: string = 'cancel';
	confirmButtonLabel: string = 'ok';
	confirmHandler: any;
	cancelHandler: any;
	data: any;
	formGroup: FormGroup;
	componentInjector: Injector;
	closeOnConfirm: boolean = true;
	closeOnCancel: boolean = true;
	closeHandler: any;

	@ViewChild(ViewRefDirective, {static: true}) componentViewRef: ViewRefDirective;

	constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnInit(): void {
		if (this.modalComponentContent) {
			this._createContentComponent();
		}
	}

	/**
	 * Create an instance of the modalComponentContent component, insert
	 * into the DOM and set any properties defined in modalTemplateComponentInitialState
	 */
	private _createContentComponent() {
		const compFactory = this._componentFactoryResolver.resolveComponentFactory(this.modalComponentContent);
		const componentRef = this.componentViewRef.viewContainerRef.createComponent(compFactory);
		const componentInstance = componentRef.instance;
		if (this.modalComponentContentInitialState) {
			Object.keys(this.modalComponentContentInitialState).forEach((key) => {
				componentInstance[key] = this.modalComponentContentInitialState[key];
			});
		}
	}

	/**
	 * handler when the close button is clicked
	 */
	onClose() {
		if (this.closeHandler) {
			this.closeHandler();
		}
		// this.bsModalRef.hide();
	}

	/**
	 * Handler when the cancel button is clicked
	 */
	onCancel() {
		if (this.cancelHandler) {
			this.cancelHandler();
		}
		if (this.closeOnCancel) {
			// this.bsModalRef.hide();
		}
	}

	/**
	 * Handler when the confirm button is clicked
	 */
	onConfirm() {
		if (this.confirmHandler) {
			this.confirmHandler(this.data);
		} else {
			console.warn('No confirmHandler for the ConfirmModalComponent');
		}
		if (this.closeOnConfirm) {
			// this.bsModalRef.hide();
		}
	}
}

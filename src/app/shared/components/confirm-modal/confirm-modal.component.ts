import {Component, OnInit, TemplateRef} from '@angular/core';

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
	modalComponentContent: Component;
	hideCancelButton: boolean = false;
	cancelButtonLabel: string = 'cancel';
	confirmButtonLabel: string = 'ok';
	confirmHandler: any;
	cancelHandler: any;

	constructor() {
	}

	ngOnInit(): void {
	}

	onCancel() {
		if (this.cancelHandler) {
			this.cancelHandler();
		}
		// this.bsModalRef.hide();
	}

	onConfirm() {
		if (this.confirmHandler) {
			this.confirmHandler();
		} else {
			console.warn('No confirmHandler for the ConfirmModalComponent');
		}
		// this.bsModalRef.hide();
	}
}

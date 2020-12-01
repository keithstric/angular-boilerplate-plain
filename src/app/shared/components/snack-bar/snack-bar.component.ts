import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';

export enum SnackbarMessageTypes {
	INFO = 'info',
	WARNING = 'warning',
	ERROR = 'error',
	SUCCESS = 'success',
	DANGER = 'danger'
}

export interface SnackbarAction {
	label: string;
	actionHandler?: any;
}

export interface SnackbarConfig {
	messageType?: SnackbarMessageTypes;
	message: string;
	duration?: number;
	action?: SnackbarAction;
}

@Component({
	selector: 'app-snack-bar',
	templateUrl: './snack-bar.component.html',
	styleUrls: ['./snack-bar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SnackBarComponent implements OnInit {
	@Input() messageType: SnackbarMessageTypes = SnackbarMessageTypes.INFO;
	@Input() message: string = 'Add a message';
	@Input() action: SnackbarAction;

	constructor(
		public snackbarRef: SnackBarRef
	) {}

	ngOnInit(): void {}

	dismiss() {
		const skip = this.snackbarRef.dismiss();
	}

}

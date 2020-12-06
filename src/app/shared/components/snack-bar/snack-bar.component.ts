import {Component, EventEmitter, Input, OnInit, ViewEncapsulation, Output} from '@angular/core';
import {SnackbarAction, SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';

/**
 * A toaster/snackbar component. Use SnackbarRef to display
 *
 * @example
 *
 * ```
 * @Injectable()
 * export class NotificationService {
 * 	foo = 'bar';
 *
 *	constructor(
 *		private _snackbarRef: SnackBarRef
 *	) {}
 *
 *	showSnackbar() {
 *		const config = {
 *		 message: 'Here is a snackbar message',
 *		 messageType: SnackbarMessageTypes.SUCCESS,
 *		 duration: 5000,
 *		 action: {
 *		 label: 'OK',
 *		 action: () => {
 *		 	console.log('action clicked')}
 *		 }
 *		}
 *		this._snackbarRef.show(config);
 *	}
 * }
 * ```
 */
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
	@Output() dismissSnackbar: EventEmitter<any> = new EventEmitter<any>();

	constructor() {}

	ngOnInit(): void {}

	dismiss() {
		this.dismissSnackbar.emit();
	}

}

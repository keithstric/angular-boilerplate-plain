import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogData} from '@shared/interfaces/confirm-dialog-data.interface';

@Component({
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
	) {
	}

	ngOnInit(): void {
	}

	/**
	 * Close the dialog and return the result
	 * @param {boolean} result
	 */
	onActionClick(result: boolean) {
		this.dialogRef.close(result);
	}
}

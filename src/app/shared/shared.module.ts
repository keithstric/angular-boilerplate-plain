import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@core/modules/material.module';
import {CardComponent} from '@shared/components/card/card.component';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';

const components = [
	CardComponent,
	ConfirmDialogComponent,
	UserAvatarComponent
];

@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [
		...components,
		MaterialModule
	],
	entryComponents: [
		ConfirmDialogComponent
	]
})

export class SharedModule { }

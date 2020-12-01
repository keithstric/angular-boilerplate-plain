import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';
import { CardComponent } from './components/card/card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

const components = [
	CardComponent,
	UserAvatarComponent,
	ConfirmModalComponent,
	SnackBarComponent
];

@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		RouterModule
	],
	providers: [
		SnackBarRef
	],
	exports: [
		...components
	],
	entryComponents: [
		SnackBarComponent
	]
})

export class SharedModule { }

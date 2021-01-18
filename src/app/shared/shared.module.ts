import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';
import {SafeHtmlPipe} from '@shared/pipes/safe-html.pipe';
import { CardComponent } from './components/card/card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

const sharedComponents = [
	CardComponent,
	UserAvatarComponent,
	ConfirmModalComponent,
	SnackBarComponent
];

@NgModule({
	declarations: [
		...sharedComponents,
		SafeHtmlPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		SnackBarRef,
		FormBuilder
	],
	exports: [
		...sharedComponents,
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [
		SnackBarComponent
	]
})

export class SharedModule { }

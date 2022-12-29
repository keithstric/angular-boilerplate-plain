import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';
import {FileDnDDirective} from '@shared/directives/file-dn-d.directive';
import {SafeHtmlPipe} from '@shared/pipes/safe-html.pipe';
import {FormHelperService} from '@shared/services/form-helper/form-helper.service';
import { CardComponent } from './components/card/card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ViewRefDirective } from './directives/view-ref.directive';
import { CharacterCounterComponent } from './components/character-counter/character-counter.component';

const sharedComponents = [
	CardComponent,
	CharacterCounterComponent,
	ConfirmModalComponent,
	SnackBarComponent,
	UserAvatarComponent,
];

const sharedDirectives = [
	FileDnDDirective
];

const sharedPipes = [
	SafeHtmlPipe
];

@NgModule({
	declarations: [
		...sharedComponents,
		...sharedDirectives,
		...sharedPipes,
		SafeHtmlPipe,
		ViewRefDirective
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		SnackBarRef,
		FormBuilder,
		FormHelperService
	],
	exports: [
		...sharedComponents,
		...sharedPipes,
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [SnackBarComponent]
})

export class SharedModule { }

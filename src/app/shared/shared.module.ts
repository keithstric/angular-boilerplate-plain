import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
	FormBuilder,
	FormControlDirective,
	FormControlName,
	FormGroupDirective,
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';
import {FileDnDDirective} from '@shared/directives/file-dn-d/file-dn-d.directive';
import {SafeHtmlPipe} from '@shared/pipes/safe-html.pipe';
import {FormHelperService} from '@shared/services/form-helper/form-helper.service';
import { CardComponent } from './components/card/card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ViewRefDirective } from 'src/app/shared/directives/view-ref/view-ref.directive';
import { CharacterCounterComponent } from './components/character-counter/character-counter.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ConnectStoreFormDirective } from '@shared/directives/connect-store-form/connect-store-form.directive';
import { CheckboxStringValueDirective } from './directives/checkbox-string-value/checkbox-string-value.directive';

const sharedComponents = [
	CardComponent,
	CharacterCounterComponent,
	ConfirmModalComponent,
	DynamicFormComponent,
	SnackBarComponent,
	UserAvatarComponent,
];

const sharedDirectives = [
	ConnectStoreFormDirective,
	FileDnDDirective,
	ViewRefDirective
];

const sharedPipes = [
	SafeHtmlPipe
];

@NgModule({
	declarations: [
		...sharedComponents,
		...sharedDirectives,
		...sharedPipes,
  CheckboxStringValueDirective
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		SnackBarRef,
		FormBuilder,
		FormHelperService,
		FormGroupDirective,
		FormControlDirective,
		FormControlName
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

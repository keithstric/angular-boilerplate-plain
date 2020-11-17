import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserAvatarComponent} from '@shared/components/user-avatar/user-avatar.component';
import { CardComponent } from './components/card/card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

const components = [
	CardComponent,
	UserAvatarComponent
];

@NgModule({
	declarations: [
		...components,
		ConfirmModalComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		...components
	],
	entryComponents: []
})

export class SharedModule { }

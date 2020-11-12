import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';

/**
 * The HomeModule
 */
@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class HomeModule { }

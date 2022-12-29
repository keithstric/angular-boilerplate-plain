import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
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
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent
			}
		])
	]
})
export class HomeModule { }

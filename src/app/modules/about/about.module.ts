import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
	{path: '', component: AboutComponent}
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		SharedModule
  ],
	exports: [
		RouterModule
	]
})
export class AboutModule { }

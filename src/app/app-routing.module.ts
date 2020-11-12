import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '@layout/components/page-not-found/page-not-found.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {HomeComponent} from '@modules/home/home.component';

/**
 * This defines the application's routes. All base routes should be lazy loaded.
 * @type {Routes}
 */
export const appRoutes: Routes = [
	{path: '', pathMatch: 'full', component: HomeComponent},
	// {path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},
	{path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

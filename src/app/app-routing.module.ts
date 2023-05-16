import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '@layout/components/page-not-found/page-not-found.component';

/**
 * This defines the application's routes. All base routes should be lazy loaded.
 * @type {Routes}
 */
export const appRoutes: Routes = [
	{path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
	{path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
	{path: 'features', loadChildren: () => import('./modules/features/features.module').then(m => m.FeaturesModule)},
	{path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

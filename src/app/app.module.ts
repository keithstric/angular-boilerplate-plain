import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@core/core.module';
import {RootStoreModule} from '@core/root-store/root-store.module';
import {ServiceLocator} from '@core/services/service-locator';
import {LayoutModule} from '@layout/layout.module';
import {AuthModule} from '@modules/auth/auth.module';
import {HomeModule} from '@modules/home/home.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import { SharedModule } from '@shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

/*
 * todo: CoreModule should only be imported here and nowhere else
 *  ref: https://youtu.be/WoCReDUpcVs?t=451
 */

/**
 * The AppModule
 */
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		AuthModule,
		BrowserAnimationsModule,
		BrowserModule,
		CoreModule,
		HomeModule,
		LayoutModule,
		ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
		SharedModule
	],
	exports: [
		CoreModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(private _injector: Injector) {
		ServiceLocator.injector = _injector;
	}
}

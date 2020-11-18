import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpRequestInterceptor} from '@core/interceptors/http-request-interceptor.service';
import {RootStoreModule} from '@core/root-store';
import {ErrorService} from '@core/services/error/error.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {UiService} from '@core/services/ui/ui.service';

const components = [];

/**
 * Core module
 */
@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		HttpClientModule,
		RootStoreModule
	],
	exports: [
		...components
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
		{provide: ErrorHandler, useClass: ErrorService},
		ErrorService,
		HttpService,
		LocalStorageService,
		UiService
	]
})
export class CoreModule { }

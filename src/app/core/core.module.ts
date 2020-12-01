import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpRequestInterceptor} from '@core/interceptors/http-request-interceptor.service';
import {RootStoreModule} from '@core/root-store';
import {DomInjectorService} from '@core/services/dom-injector/dom-injector.service';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {NotificationService} from '@core/services/notification/notification.service';

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
		{provide: ErrorHandler, useClass: AppErrorHandler},
		HttpService,
		LocalStorageService,
		NotificationService,
		DomInjectorService
	]
})
export class CoreModule { }

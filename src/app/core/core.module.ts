import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpRequestInterceptor} from '@core/interceptors/http-request-interceptor.service';
import {RootStoreModule} from '@core/root-store/root-store.module';
import {DomInjectorService} from '@core/services/dom-injector/dom-injector.service';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';
import {HttpCacheService} from '@core/services/http-cache/http-cache.service';
import {HttpService} from '@core/services/http/http.service';
import {LocalStorageService} from '@core/services/local-storage/local-storage.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {RouterStateService} from '@core/services/router-state/router-state.service';

/**
 * Core module
 */
@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RootStoreModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
		{provide: ErrorHandler, useClass: AppErrorHandler},
		DomInjectorService,
		HttpCacheService,
		HttpService,
		LocalStorageService,
		NotificationService,
		RouterStateService
	]
})
export class CoreModule { }

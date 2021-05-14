import {Injector} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * This class is for locating a Service for use in a plain old class
 * for example a Model. This allows services to be used anywhere.
 *
 * It also provides a static observable
 *
 * @example
 * // In plain old class
 * export class Foo {
 *   private _http: HttpService = ServiceLocator.injector.get(HttpService);
 *
 *   amazingMethod() {
 *     this._http....
 *   }
 * }
 *
 * @example
 * // Must be instantiated in the app module
 * export class AppModule {
 *   constructor(private _injector: Injector) {
 *     ServiceLocator.injector = _injector;
 *   }
 * }
 */
export class ServiceLocator {
	static injector: Injector;
	static observableInjector: BehaviorSubject<Injector> = new BehaviorSubject<Injector>(ServiceLocator.injector);
}

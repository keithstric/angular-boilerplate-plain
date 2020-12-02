import {
	ApplicationRef,
	ComponentFactoryResolver,
	ComponentRef,
	EmbeddedViewRef,
	Injectable,
	Injector
} from '@angular/core';

/**
 * This service is for injecting components into the document body and being able to destroy them and ensuring that the component
 * is known to the ng component tree.
 *
 * Unfortunately this service cannot be injected via a parameter in a constructor. It must be used from the
 * Injector @link {Injector}
 *
 * @example
 *
 * constructor(private _injector: Injector){}
 *
 * someMethod() {
 *   const domInjector: DomInjectorService = this._injector.get(DomInjectorService);
 * }
 */
@Injectable()
export class DomInjectorService {

	constructor(
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _appRef: ApplicationRef,
		private _injector: Injector
	) {}

	/**
	 * Create a ComponentRef<unknown> from passed in component
	 * @param {any} component a component class
	 * @param {any} componentProps an object which contains the @Input properties to set on component
	 * @returns {ComponentRef}
	 */
	createComponent(component: any, componentProps?: object) {
		// 1. Create a component reference from the component
		const componentRef = this._componentFactoryResolver
			.resolveComponentFactory(component)
			.create(this._injector);

		if (componentProps && typeof componentRef.instance === 'object') {
			Object.assign(componentRef.instance as object, componentProps);
		}

		return componentRef;
	}

	/**
	 * Add the passed componentRef to the ng component tree and append to the appendTo element
	 * @param {ComponentRef} componentRef
	 * @param {Element} appendTo
	 * @returns {HTMLElement}
	 */
	attachComponent(componentRef: ComponentRef<unknown>, appendTo: Element) {
		// 2. Attach component to the appRef so that it's inside the ng component tree
		this._appRef.attachView(componentRef.hostView);

		// 3. Get DOM element from component
		const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;

		// 4. Append DOM element to the the appendTo element
		appendTo.appendChild(domElem);
		return domElem;
	}

	/**
	 * Remove the componentRef from the ng component tree, destroy the component and remove it
	 * from the DOM
	 * @param {ComponentRef} componentRef
	 */
	removeComponent(componentRef: ComponentRef<unknown>) {
		if (componentRef) {
			const hostView = componentRef.hostView;
			const hostDomElem: HTMLElement = (hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
			this._appRef.detachView(componentRef.hostView);
			componentRef.destroy();
			hostDomElem.remove();
		}
	}
}

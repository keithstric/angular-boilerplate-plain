import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
	selector: '[appViewRef]'
})
export class ViewRefDirective {
	constructor(public viewContainerRef?: ViewContainerRef) {}
}

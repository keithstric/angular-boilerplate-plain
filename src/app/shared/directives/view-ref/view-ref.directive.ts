import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appViewRef]',
    standalone: false
})
export class ViewRefDirective {
	constructor(public viewContainerRef?: ViewContainerRef) {}
}

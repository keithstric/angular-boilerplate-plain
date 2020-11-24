import {Injectable} from '@angular/core';
import {SiteFooterComponent} from '@layout/components/site-footer/site-footer.component';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {BehaviorSubject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	headerSource = new BehaviorSubject<any>(SiteHeaderComponent);
	footerSource = new BehaviorSubject<any>(SiteFooterComponent);
	headerComponent = this.headerSource.asObservable();
	footerComponent = this.footerSource.asObservable();

	constructor() { }

	/**
	 * Change the site header
	 * @param component {Component}
	 */
	setHeader(component: any) {
		this.headerSource.next(component);
	}

	/**
	 * Change the site footer
	 * @param component {Component}
	 */
	setFooter(component: any) {
		this.footerSource.next(component);
	}
}

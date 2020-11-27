import {Injectable} from '@angular/core';
import {SiteFooterComponent} from '@layout/components/site-footer/site-footer.component';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {BehaviorSubject} from 'rxjs';

/**
 * This service is for updating pieces of the layout (i.e. Header, Footer and Sidebar)
 */
@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	headerSource = new BehaviorSubject<any>(SiteHeaderComponent);
	headerComponent = this.headerSource.asObservable();
	footerSource = new BehaviorSubject<any>(SiteFooterComponent);
	footerComponent = this.footerSource.asObservable();
	sidebarSource = new BehaviorSubject<any>(null);
	sidebarComponent = this.sidebarSource.asObservable();

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

	/**
	 * Change the sidebar
	 * @param component {Component}
	 */
	setSidebar(component: any) {
		this.sidebarSource.next(component);
	}
}

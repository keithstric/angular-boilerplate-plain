import {Component, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SiteFooterComponent} from '../../components/site-footer/site-footer.component';

@Injectable({
	providedIn: 'root'
})
export class FooterService {
	private footerSource = new BehaviorSubject<any>(SiteFooterComponent);
	/**
	 * Observable for updating the site header
	 * @type {Observable}
	 */
	footerComponent = this.footerSource.asObservable();

	constructor() {
	}

	/**
	 * Change the site header
	 * @param component {Component}
	 */
	setFooter(component: any) {
		this.footerSource.next(component);
	}
}

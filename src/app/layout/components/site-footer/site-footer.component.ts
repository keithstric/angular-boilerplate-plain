import {Component, OnInit} from '@angular/core';

/**
 * The default footer component
 *
 * @example
 *
 * ```
 * constructor(private _layout: LayoutService){}
 *
 * setHeader() {
 *   this._layout.setFooter(SomeFooterComponent);
 * }
 * ```
 */
@Component({
	selector: 'app-site-footer',
	templateUrl: './site-footer.component.html',
	styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit {

	constructor() {	}

	ngOnInit(): void {	}

}

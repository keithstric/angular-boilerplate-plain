import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Breadcrumb} from '@layout/interfaces/breadcrumb.interface';
import {BreadcrumbService} from '@layout/services/breadcrumb/breadcrumb.service';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
	breadcrumbs: Breadcrumb[] = [];
	breadcumbsSub: Subscription;

	constructor(
		private _breadcrumbs: BreadcrumbService
	) { }

	ngOnInit(): void {
		this.listenToBreadcrumbs();
	}

	/**
	 * Listen to breadcrumbs service and update the breadCrumbs property
	 */
	listenToBreadcrumbs() {
		this.breadcumbsSub = this._breadcrumbs.breadcrumbsSub
			.subscribe((breadcrumbs) => {
				this.breadcrumbs = breadcrumbs;
			});
	}

}

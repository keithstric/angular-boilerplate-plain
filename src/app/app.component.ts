import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from '@layout/services/layout/layout.service';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {SiteFooterComponent} from '@layout/components/site-footer/site-footer.component';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {LoadingService} from '@layout/services/loading/loading.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = PROJECT_NAME;
	loading: boolean = false;
	headerComponent: any;
	footerComponent: any;
	sidebarComponent: any;
	subscriptions: Subscription = new Subscription();

	constructor(
		private _loading: LoadingService,
		private _cdr: ChangeDetectorRef,
		private _layout: LayoutService
	) {
	}

	ngOnInit() {
		this.listenToHeader();
		this.listenToFooter();
		this.listenToSidebar();
		this.listenToLoading();
		this._layout.setHeader(SiteHeaderComponent);
		this._layout.setFooter(SiteFooterComponent);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Listen to changes of the header and update the header component
	 */
	listenToHeader() {
		this.subscriptions.add(this._layout.headerComponent.subscribe((header: Component) => {
			this.headerComponent = header;
			this._cdr.detectChanges();
		}));
	}

	/**
	 * Listen to changes of the footer and update the footer component. If no footer is desired
	 * remove the subscription
	 */
	listenToFooter() {
		this.subscriptions.add(this._layout.footerComponent.subscribe((footer: Component) => {
			this.footerComponent = footer;
			this._cdr.detectChanges();
		}));
	}

	listenToSidebar() {
		// TODO
	}

	/**
	 * Listen to the loading service's loadingSub and
	 * toggle visibility of the spinner
	 */
	listenToLoading() {
		this.subscriptions.add(this._loading.loadingSub
			.pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
			.subscribe((loading) => {
				this.loading = loading;
			}));
	}
}

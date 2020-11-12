import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {SiteFooterComponent} from '@layout/components/site-footer/site-footer.component';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {FooterService} from '@layout/services/footer/footer.service';
import {HeaderService} from '@layout/services/header/header.service';
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
	subscriptions: Subscription = new Subscription();

	constructor(
		private _loading: LoadingService,
		private _header: HeaderService,
		private _footer: FooterService,
		private _cdr: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		//
		this.listenToHeader();
		this.listenToFooter();
		this.listenToLoading();
		this._header.setHeader(SiteHeaderComponent);
		this._footer.setFooter(SiteFooterComponent);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Listen to changes of the header and update the header component
	 */
	listenToHeader() {
		this.subscriptions.add(this._header.headerComponent.subscribe((header: Component) => {
			this.headerComponent = header;
			this._cdr.detectChanges();
		}));
	}

	/**
	 * Listen to changes of the footer and update the footer component. If no footer is desired
	 * remove the subscription
	 */
	listenToFooter() {
		this.subscriptions.add(this._footer.footerComponent.subscribe((footer: Component) => {
			this.footerComponent = footer;
			this._cdr.detectChanges();
		}));
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

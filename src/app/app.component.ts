import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {RouterStateService} from '@core/services/router-state/router-state.service';
import {LayoutService} from '@layout/services/layout/layout.service';
import {Store} from '@ngrx/store';
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
		private _layout: LayoutService,
		private store: Store<{loading: boolean}>,
		private _routerState: RouterStateService
	) {
	}

	ngOnInit() {
		this.listenToHeader();
		this.listenToFooter();
		this.listenToSidebar();
		this.listenToLoading();
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

	/**
	 * Listen to changes of the sidebar and update the sidebar component. If not sidebar is desired
	 * remove the subscription
	 */
	listenToSidebar() {
		this.subscriptions.add(this._layout.sidebarComponent.subscribe((sidebar: Component) => {
			this.sidebarComponent = sidebar;
			this._cdr.detectChanges();
		}));
	}

	/**
	 * Listen to the loading service's loadingSub and
	 * toggle visibility of the spinner
	 */
	listenToLoading() {
		this.store.select(store => store.loading)
			.pipe(delay(0))
			.subscribe((loading) => {
				this.loading = loading;
			});
	}
}

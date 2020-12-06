import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iUserState} from '@core/root-store/models/app-state.model';
import {AuthService} from '@core/services/auth/auth.service';
import {MockStore} from '@ngrx/store/testing';
import {PageBreadcrumbHeaderComponent} from '@layout/components/page-breadcrumb-header/page-breadcrumb-header.component';
import {BreadcrumbService} from '@layout/services/breadcrumb/breadcrumb.service';

@Component({
	selector: 'app-card',
	template: '<p>Mock app-card</p>'
})
export class MockCardComponent {
	@Input() withBorder = true;
	@Input() raised = true;
}

@Component({
	selector: 'app-page-breadcrumb-header',
	template: '<p>Mock page-breadcrumb-header</p>'
})
export class MockPageBreadcrumbHeaderComponent {
	@Input() showAddButton: boolean = false;
	@Output() addButtonClick: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
	selector: 'app-header',
	template: '<p>Mock site-header</p>'
})
export class MockSiteHeaderComponent {
}

@Component({
	selector: 'app-not-found',
	template: '<p>Mock page not found</p>'
})
export class MockPageNotFoundComponent {
}

@Component({
	selector: 'app-page-breadcrumb-header',
		template: `<div class="flex-row page-header">
			<app-breadcrumbs></app-breadcrumbs>
			<span class="spacer"></span>
			<button *ngIf="showAddButton" (click)="clickAddButton()" type="button">
				<!--<mat-icon>add</mat-icon>-->
			</button>
		</div>`
})
export class MockStorybookPageBreadcrumbHeaderComponent extends PageBreadcrumbHeaderComponent implements OnInit{

	constructor(
		private _breadcrumbs: BreadcrumbService
	) {
		super();
	}

	ngOnInit() {
		this._breadcrumbs.addBreadcrumb({url: 'http://localhost:4201', title: 'Home'});
		this._breadcrumbs.addBreadcrumb({url: 'http://localhost:4201/page1', title: 'Page1'});
		this._breadcrumbs.addBreadcrumb({url: 'http://localhost:4201/page2', title: 'Page2'});
	}

	/**
	 * If the add button is clicked fires the addButtonClick event
	 * @event {addButtonClick}
	 */
	clickAddButton() {
		this.addButtonClick.emit();
	}
}

/**
 * This component is for the confirm-dialog.stories.ts storybook story to
 * open the confirm-dialog when loaded
 */
/*@Component({
	selector: 'app-mock-open-dialog',
	template: `<ng-template #exampleTemplate>
		This is from a template (#exampleTemplate) inside MockStorybookOpenDialogComponent
	</ng-template>`
})
export class MockStorybookOpenDialogComponent implements OnInit {
	@Input() data: ConfirmDialogData = {};
	@ViewChild('exampleTemplate', {static: true}) exampleTemplate: TemplateRef<any>;

	constructor(
		public dialog: MatDialog
	) {}

	ngOnInit() {
		if (this.data.messageTemplate) {
			this.data.messageTemplate = this.exampleTemplate;
		}
		this.dialog.open(ConfirmDialogComponent, {data: this.data});
	}
}*/

/**
 * This component is for the confirm-dialog.stories.ts storybook story to display
 * a component as the message content
 */
@Component({
	selector: 'app-mock-dialog-content',
	template: `<p>This is a component (MockStorybookDialogContentComponent) {{text}}</p>`
})
export class MockStorybookDialogContentComponent {
	text: string = 'with some dynamic text from the "text" property';
}

/**
 * This component is for capturing a click event on the avatar in the
 * user-avatar.stories.ts storybook story
 */
@Component({
	selector: 'app-mock-avatar',
	template: `
		<p>Click the avatar and see the console for the click message</p>
		<div style="height: 48px; width: 48px;">
			<app-user-avatar class="small" (avatarClicked)="onAvatarClicked($event)"></app-user-avatar>
		</div>`
})
export class MockStorybookUserAvatarComponent {

	onAvatarClicked(evt: any) {
		console.log('Avatar Clicked! evt=', evt);
	}
}

@Component({
	selector: 'app-mock-no-user-avatar',
	template: `
		<div style="height: 48px; width: 48px;">
			<app-user-avatar class="small" (avatarClicked)="onAvatarClicked($event)"></app-user-avatar>
			<app-user-avatar class="medium" (avatarClicked)="onAvatarClicked($event)"></app-user-avatar>
			<app-user-avatar class="large" (avatarClicked)="onAvatarClicked($event)"></app-user-avatar>
			<app-user-avatar class="huge" (avatarClicked)="onAvatarClicked($event)"></app-user-avatar>
		</div>`
})
export class MockStorybookNoUserAvatarComponent implements OnInit {

	constructor(
		private _auth: AuthService,
		private store: MockStore<{user: iUserState}>
	) {}

	ngOnInit() {
		this.store.select(store => store.user)
			.subscribe((user) => {
				console.log('user=', user);
			});
		this.store.setState({user: {data: null, loading: false, error: null}});
	}

	onAvatarClicked(evt: any) {
		console.log('Avatar Clicked!', evt);
	}
}


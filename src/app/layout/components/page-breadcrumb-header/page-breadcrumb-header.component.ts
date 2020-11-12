import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-page-breadcrumb-header',
	templateUrl: './page-breadcrumb-header.component.html',
	styleUrls: ['./page-breadcrumb-header.component.scss']
})
export class PageBreadcrumbHeaderComponent implements OnInit {
	@Input() showAddButton: boolean = false;
	@Output() addButtonClick: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void { }

	/**
	 * If the add button is clicked fires the addButtonClick event
	 * @event {addButtonClick}
	 */
	clickAddButton() {
		this.addButtonClick.emit();
	}

}

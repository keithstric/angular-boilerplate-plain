import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom // for styling ng-content
})
export class CardComponent implements OnInit {
	@Input() withBorder: boolean = false;
	@Input() raised: boolean = false;

	constructor() {
	}

	ngOnInit(): void {
	}

}

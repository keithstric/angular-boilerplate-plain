import {Component, Input, OnInit} from '@angular/core';

/**
 * A generic card component
 *
 * @example
 *
 * <app-card [withBorder]="true" [raised]="true">
 *   <h1 header>The Header</h1>
 *   <div content>Here is the content</div>
 *   <div actions>
 *     <button>Cancel</button>
 *     <button>OK</button>
 *   </div>
 *   <div footer>
 *     <span>Here is the footer</span>
 *   </div>
 * </app-card>
 */
@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input() withBorder: boolean = false;
	@Input() raised: boolean = false;

	constructor() {
	}

	ngOnInit(): void {
	}

}

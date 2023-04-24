import {Component} from '@angular/core';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';

@Component({
	selector: 'app-home-header',
	templateUrl: './home-header.component.html',
	styleUrls: [
		'../../../../layout/components/site-header/site-header.component.scss',
		'./home-header.component.scss'
	]
})
export class HomeHeaderComponent extends SiteHeaderComponent { }

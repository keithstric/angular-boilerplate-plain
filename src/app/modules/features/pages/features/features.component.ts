import {Component, OnInit} from '@angular/core';

interface Feature {
	name: string;
	docsUrl: string;
	version: string;
	docsIcon: string;
	description: string;
}

@Component({
	selector: 'app-features',
	templateUrl: './features.component.html',
	styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
	features: Feature[] = [
		{
			name: 'Angular',
			version: '11.0.3',
			description: 'Modern powerful framework',
			docsUrl: 'https://angular.io/docs',
			docsIcon: 'article'
		}, {
			name: 'Angular Cli',
			version: '11.0.3',
			description: 'Command line interface for angular',
			docsUrl: 'https://cli.angular.io/',
			docsIcon: 'article'
		}, {
			name: 'NgRx',
			version: '10.1.0',
			description: 'Redux for angular',
			docsUrl: 'https://ngrx.io',
			docsIcon: 'article'
		}, {
			name: 'RxJS',
			version: '6.6.3',
			description: 'Asynchronous and event-based programs',
			docsUrl: 'https://rxjs-dev.firebaseapp.com/guide/overview',
			docsIcon: 'article'
		}, {
			name: 'Typescript',
			version: '4.0.5',
			description: 'Superset of JavaScript',
			docsUrl: 'https://www.typescriptlang.org',
			docsIcon: 'article'
		}, {
			name: 'Lazy Loading',
			version: undefined,
			description: 'Lazy loaded feature modules',
			docsUrl: 'https://angular.io/guide/router#lazy-loading-route-configuration',
			docsIcon: 'article'
		}, {
			name: 'Tslint',
			version: '6.1.0',
			description: 'Identify problematic patterns in Typescript code',
			docsUrl: 'https://palantir.github.io/tslint/',
			docsIcon: 'article'
		}, {
			name: 'Compodoc',
			version: '1.1.11',
			description: 'Detailed documentation for your project',
			docsUrl: 'https://compodoc.app/',
			docsIcon: 'article'
		}, {
			name: 'Storybook',
			version: '6.1.10',
			description: 'A component library for developing components in isolation',
			docsUrl: 'https://storybook.js.org/',
			docsIcon: 'article'
		}, {
			name: 'route-parser',
			version: '0.0.5',
			description: 'Library for parsing route patterns',
			docsUrl: 'https://github.com/rcs/route-parser',
			docsIcon: 'article'
		}];

	constructor() {
	}

	ngOnInit(): void {}

}

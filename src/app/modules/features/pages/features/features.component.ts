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
			version: '13.0.4',
			description: 'Modern powerful framework',
			docsUrl: 'https://angular.io/docs',
			docsIcon: 'article'
		}, {
			name: 'Angular Cli',
			version: '13.0.4',
			description: 'Command line interface for angular',
			docsUrl: 'https://cli.angular.io/',
			docsIcon: 'article'
		}, {
			name: 'NgRx Store',
			version: '13.0.2',
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
			version: '4.4.4',
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
			version: '1.1.16',
			description: 'Detailed documentation for your project',
			docsUrl: 'https://compodoc.app/',
			docsIcon: 'article'
		}, {
			name: 'route-parser',
			version: '1.0.0',
			description: 'Library for parsing route patterns',
			docsUrl: 'https://github.com/rcs/route-parser',
			docsIcon: 'article'
		}, {
			name: 'Included Logger',
			version: '1.0.0',
			description: 'Logging infrastructure already put in place with support for uploading log entries to upstream api',
			docsUrl: '',
			docsIcon: 'article'
		}, {
			name: 'Components',
			description: 'Included components: card, character-counter, user-avatar, snack-bar/toaster',
			version: '0.0.0',
			docsUrl: '',
			docsIcon: 'article'
		}, {
			name: 'Form Utils',
			description: 'Includes form utilities for converting JavaScript objects to form elements',
			version: '1.0.0',
			docsUrl: '',
			docsIcon: 'article'
		}];

	constructor() {
	}

	ngOnInit(): void {}

}

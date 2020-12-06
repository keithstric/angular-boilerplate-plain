import {Component, OnInit} from '@angular/core';

interface Contributor {
	name: string;
	avatar: string;
	githubUserName: string;
	githubLink: string;
}

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	contributors: Contributor[] = [{
		name: 'Keith Strickland',
		githubUserName: 'keithstric',
		avatar: 'https://avatars3.githubusercontent.com/u/463194?s=60&v=4',
		githubLink: 'https://github.com/keithstric'
	}];

	constructor() {
	}

	ngOnInit(): void {
	}

}

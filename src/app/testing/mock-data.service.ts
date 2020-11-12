import {Injectable} from '@angular/core';
import userJson from 'src/app/testing/mock-data/user.json';

/**
 * This service is for providing mock data for unit tests
 */

@Injectable({
	providedIn: 'root'
})
export class MockDataService {

	constructor() {
	}

	get user() {
		return userJson;
	}
}

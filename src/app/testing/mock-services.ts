import {HttpErrorResponse} from '@angular/common/http';
import {SnackbarConfig} from '@shared/components/snack-bar/snack-bar.interface';
import {BehaviorSubject, Subject} from 'rxjs';
import {ApiEndpoints, ApiMethod} from '@core/interfaces/api.interface';
import userJson from 'src/app/testing/mock-data/user.json';
import {PROJECT_NAME} from 'src/environments/environment';

export class MockHttpService {
	requestCall(api: ApiEndpoints | string, method: ApiMethod, data?: any) {
	}

	handleError(error: HttpErrorResponse, self: MockHttpService) {
	}
}

export class MockErrorService {
	errorEvent: Subject<Error> = new Subject<any>();

	notifyUser(notificationCode: number, notification: string) {
	}

	handleError(errorCode: number, message: string, err: Error) {
	}
}

export class MockLocalStorageService {
	getItem(storageType: 'local' | 'session', varName: string) {
	}

	setItem(storageType: 'local' | 'session', varName: string, value: any) {
	}

	removeItem(storageType: 'local' | 'session', varName: string) {
	}
}

export class MockUiService {
	notifyUser(msg: string, duration?: number, action?: string, actionFn?: (...args) => void) {}
	showSnackbar(config: SnackbarConfig) {}
}

export class MockAuthService {
	authData: BehaviorSubject<any> = new BehaviorSubject<any>(userJson);

	isAuthenticated() {
	}

	getUser() {
		return userJson;
	}

	login(loginData: any) {
	}

	getUserInitials() {
		return 'KS';
	}
}


export class MockHeaderService {
	currentHeaderTitleSub: BehaviorSubject<string> = new BehaviorSubject(PROJECT_NAME);

	updateHeaderTitle(newTitle: string) {
	}
}

export class MockRouter {
	navigateByUrl(url: string) {
		return url;
	}
}

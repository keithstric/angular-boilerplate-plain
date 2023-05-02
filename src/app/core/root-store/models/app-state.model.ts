import {Params} from '@angular/router';
import {User} from '@core/models/user.model';
import {IFormsState} from '@core/root-store/forms';
import {RouterReducerState} from '@ngrx/router-store';

export interface iStateItem {
	data: any;
	loading: boolean;
	error: Error | null;
	loaded?: boolean;
}

export interface iUserState extends iStateItem {
	data: User | null;
}

export interface RouterStateUrl {
	url: string;
	queryParams: Params;
	params: Params;
}

export interface AppState {
	readonly user: iUserState | null;
	readonly loading: boolean | false;
	readonly router: RouterReducerState<RouterStateUrl>;
	readonly forms: IFormsState | null; // for demo purposes only
}



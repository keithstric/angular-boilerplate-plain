import {User} from '@core/models/user.model';

export interface iStateItem {
	data: any;
	loading: boolean;
	error: Error | null;
}

export interface iUserState extends iStateItem {
	data: User | null;
}

export interface iRootState {
	loading: boolean;
}

export interface AppState {
	readonly user: iUserState | null;
	readonly loading: boolean | false;
}



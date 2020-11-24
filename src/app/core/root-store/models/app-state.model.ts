import {User} from '@shared/models/user.model';

interface iLayout {
	header: any;
	footer: any;
}

export interface iStateItem {
	data: any;
	loading: boolean;
	error: Error | null;
}

export interface iUserState extends iStateItem {
	data: User | null;
}

export interface AppState {
	readonly user: iUserState | null;
	readonly layout: iLayout;
}



import {iUserState} from '@core/root-store/user/user.reducer';

interface iLayout {
	header: any;
	footer: any;
}

export interface AppState {
	readonly user: iUserState | null;
	readonly layout: iLayout;
}

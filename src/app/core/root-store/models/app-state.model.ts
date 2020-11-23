import {User} from '@shared/models/user.model';

interface iLayout {
	header: any;
	footer: any;
}

export interface AppState {
	readonly user: User | null;
	readonly layout: iLayout;
}

export enum SnackbarMessageTypes {
	INFO = 'info',
	WARNING = 'warning',
	ERROR = 'error',
	SUCCESS = 'success',
	DANGER = 'danger'
}

export interface SnackbarAction {
	label: string;
	actionHandler?: any;
}

export interface SnackbarConfig {
	messageType?: SnackbarMessageTypes;
	message: string;
	duration?: number;
	action?: SnackbarAction;
}

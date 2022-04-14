import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.interface';

export enum LogLevel {
	error,
	warn,
	info,
	verbose,
	debug,
	silly
}

export const LogLevelNameMap = [
	'error',
	'warn',
	'info',
	'verbose',
	'debug',
	'silly'
];

export const SnackbarMessageLoggingMap = {
	[LogLevel.info]: SnackbarMessageTypes.INFO,
	[LogLevel.warn]: SnackbarMessageTypes.WARNING,
	[LogLevel.error]: SnackbarMessageTypes.DANGER,
	[LogLevel.debug]: SnackbarMessageTypes.SUCCESS,
	[LogLevel.verbose]: SnackbarMessageTypes.INFO,
	[LogLevel.silly]: SnackbarMessageTypes.INFO,
};

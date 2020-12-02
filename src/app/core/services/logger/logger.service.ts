import { Injectable } from '@angular/core';
import {ConsoleTransport} from '@core/services/logger/console-transport';
import {LogEntry} from '@core/services/logger/log-entry';
import {AbstractTransport} from '@core/services/logger/abstract-transport';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackbarMessageTypes} from '@shared/components/snack-bar/snack-bar.component';
import {BehaviorSubject} from 'rxjs';
import {environment} from 'src/environments/environment';

export enum LogLevel {
	error,
	warn,
	info,
	verbose,
	debug,
	silly
}

export const LogLevelMap = [
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

@Injectable()
export class LoggerService {
	logs: BehaviorSubject<LogEntry[]> = new BehaviorSubject<LogEntry[]>([]);
	/**
	 * Array of transports. There should be a transport for every logging type you
	 * might need
	 */
	transports: AbstractTransport[] = [];
	/**
	 * Set this to the highest logging level you want to use
	 */
	level: LogLevel = LogLevel.info;

	constructor(
		private _notify: NotificationService
	) {
		this.listenToLogs();
		if (environment.production) {
			this.transports = [];
		}else{
			this.transports = [
				new ConsoleTransport(LogLevel.info)
			];
		}
	}

	/**
	 * Listen to the logs array. If we get a certain amount or reach a time
	 * threshold then send the log entries to the backend to be persisted and
	 * clear the array
	 *
	 * @todo: Decide where this should reside. I think it should actually be in the transport
	 */
	listenToLogs() {
		this.logs
			.subscribe((logs) => {
				if (logs && logs.length) {
					// send the logs to a logging service
					// todo: Figure out what to do with the logs. Maybe this should be handled in a transport?
				}
			});
	}

	error(message, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.error, message, optionalParams);
	}

	warn(message, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.warn, message, optionalParams);
	}

	info(message, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.info, message, optionalParams);
	}

	verbose(message, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.verbose, message, optionalParams);
	}

	debug(message, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.debug, message, optionalParams);
	}

	silly(message, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.silly, message, optionalParams);
	}

	/**
	 * Send the log entry off to the transport. Will display or store the log entry
	 * @param {LogLevel} level
	 * @param {string} message
	 * @param {any[]} optionalParams
	 */
	writeToLog(level: LogLevel, message: string, ...optionalParams: any[]) {
		if (this.shouldLog(level)) {
			let logEntry = new LogEntry(level, message);
			if (optionalParams) {
				logEntry = new LogEntry(level, message, ...optionalParams);
			}
			this.transports.forEach((transport) => {
				const loggedEntry = transport.logMessage(logEntry);
				if (loggedEntry.shouldPersist) {
					const newLogs = [...this.logs.value];
					newLogs.push(loggedEntry);
					this.logs.next(newLogs);
				}
				if (loggedEntry.shouldNotifyUser) {
					this._notify.showSnackbar({
						message: loggedEntry.message,
						messageType: SnackbarMessageLoggingMap[level]
					});
				}
			});
		}
	}

	/**
	 * Determines if a log entry should actually be logged
	 * @param level
	 * @returns {boolean}
	 */
	shouldLog(level: LogLevel) {
		let returnVal = false;
		if (level <= this.level) {
			returnVal = true;
		}
		return returnVal;
	}
}

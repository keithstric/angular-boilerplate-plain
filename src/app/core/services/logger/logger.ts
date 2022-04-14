import {LogLevel, SnackbarMessageLoggingMap} from '@core/services/logger/logger.interface';
import {AbstractTransport} from '@core/services/logger/abstract-transport';
import {ConsoleTransport} from '@core/services/logger/console-transport';
import {LogEntry} from '@core/services/logger/log-entry';
import {NotificationService} from '@core/services/notification/notification.service';
import {environment, LOG_LEVEL} from 'src/environments/environment';


/**
 * The application logger. This is not a service and does not need to be injected in the constructor but can
 * be referenced statically.
 *
 * @example
 * Logger.log(LogLevel.debug, 'this is a message', foo);
 * Logger.log(LogLevel.info, 'this is a message');
 * Logger.debug('this is a message', foo);
 * Logger.info('this is a message');
 * Logger.error(err.message, err);
 */
export class Logger {
	/**
	 * The application logging level. Set this to the highest logging
	 * level you want to be used. If you look at the LogLevel enum, each level
	 * is an integer with silly being 5 and error being 0. So setting the
	 * LogLevel to info (2) all lower logging levels WILL also be logged (i.e. warn (1) and error (0))
	 * but verbose (3), debug (4) and silly (5) will NOT be logged.
	 */
	static level: LogLevel = LOG_LEVEL;
	/**
	 * Define the log levels which should be sent to BigQuery
	 * @private
	 */
	private static httpTransportPersistLevels = [LogLevel.error];
	/**
	 * Array of transports. There should be a transport for every logging type you
	 * might need
	 */
	static transports: AbstractTransport[] = environment.production
		? [new ConsoleTransport(Logger.level, true)]
		: [new ConsoleTransport(Logger.level)];

	private static getLogEntryOptions(transport: AbstractTransport, level: LogLevel, message: string, ...optionalParams: any[]): LogEntry {
		const logEntry = new LogEntry(level, message, ...optionalParams);
		if (transport.shouldPersist && Logger.httpTransportPersistLevels.includes(level)) {
			logEntry.shouldPersist = true;
		}
		logEntry.shouldNotifyUser = transport.shouldNotifyUser;
		logEntry.logWithDate = transport.logWithDate;
		return logEntry;
	}

	static error(message, ...optionalParams: any[]) {
		Logger.writeToLog(LogLevel.error, message, optionalParams);
	}

	static warn(message, ...optionalParams: any[]) {
		Logger.writeToLog(LogLevel.warn, message, optionalParams);
	}

	static info(message, ...optionalParams: any[]) {
		Logger.writeToLog(LogLevel.info, message, optionalParams);
	}

	static verbose(message, ...optionalParams: any[]) {
		Logger.writeToLog(LogLevel.verbose, message, optionalParams);
	}

	static debug(message, ...optionalParams: any[]) {
		Logger.writeToLog(LogLevel.debug, message, optionalParams);
	}

	static silly(message, ...optionalParams: any[]) {
		Logger.writeToLog(LogLevel.silly, message, optionalParams);
	}

	static log(level: LogLevel, message: string, ...optionalParams) {
		Logger.writeToLog(level, message, optionalParams);
	}

	/**
	 * Send the log entry off to the transport. Will display or store the log entry
	 * @param {LogLevel} level
	 * @param {string} message
	 * @param {any[]} optionalParams
	 */
	static writeToLog(level: LogLevel, message: string, ...optionalParams: any[]) {
		if (Logger.shouldLog(level)) {
			Logger.transports.forEach((transport) => {
				const logEntry = Logger.getLogEntryOptions(transport, level, message, ...optionalParams);
				const loggedEntry = transport.logMessage(logEntry);
				if (loggedEntry.shouldNotifyUser) {
					NotificationService.showSnackbar({
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
	static shouldLog(level: LogLevel) {
		return level <= Logger.level;
	}
}

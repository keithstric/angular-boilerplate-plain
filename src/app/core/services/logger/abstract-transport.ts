import {LogLevel} from '@core/services/logger/logger.interface';
import {LogEntry} from '@core/services/logger/log-entry';

export interface FormattedMessage {
	message: string;
	replacementVars: any[];
}

/**
 * Abstract transport class that all Logger Transports should extend
 */
export abstract class AbstractTransport {

	/**
	 * Set to true to include the date in the logging message
	 */
	abstract readonly logWithDate: boolean;

	/**
	 * Set to true if entries should be persisted to db
	 */
	abstract readonly shouldPersist: boolean;

	/**
	 * Set to true if entries should notify the user
	 */
	abstract readonly shouldNotifyUser: boolean;

	protected constructor(public level: LogLevel) {}

	/**
	 * The name of this transport
	 */
	get name() {
		return this.constructor.name;
	}

	/**
	 * Show the log or commit it to a database. If you need to modify
	 * 'logWithDate', 'shouldPersist', 'shouldNotifyUser' on a per
	 * log message basis, do it here otherwise it'll use whatever is
	 * defined as those class member properties
	 *
	 * @param {LogEntry} logEntry
	 */
	protected abstract log(logEntry: LogEntry): LogEntry;

	/**
	 * This should be a custom formatter for the log message
	 * @param logEntry
	 */
	protected formatMessage(logEntry: LogEntry): FormattedMessage | void {}

	/**
	 * Called from LoggerService to ensure that shouldNotifyUser, shouldPersist and
	 * logWithDate are properly set on the logEntry
	 * @param {LogEntry} logEntry
	 */
	public logMessage(logEntry: LogEntry): LogEntry {
		logEntry.shouldNotifyUser = this.shouldNotifyUser;
		logEntry.shouldPersist = this.shouldPersist;
		logEntry.logWithDate = this.logWithDate;
		return this.log(logEntry);
	}
}

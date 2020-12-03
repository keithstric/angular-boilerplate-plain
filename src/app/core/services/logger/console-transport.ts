import {LogLevel, LogLevelNameMap} from '@core/interfaces/logger.interface';
import {AbstractTransport} from '@core/services/logger/abstract-transport';
import {LogEntry} from '@core/services/logger/log-entry';

/**
 * This is a console logger transport. Will display all received log entries in the console
 */
export class ConsoleTransport extends AbstractTransport {
	readonly logWithDate = false;
	readonly shouldPersist = false;
	readonly shouldNotifyUser = false;
	logLevelColors: string[] = [
		'color: #de1414;',
		'color: #fff3cd;',
		'color: #d1ecf1;',
		'color: #856404;',
		'color: #d4edda;',
		'color: #f8d7da;'
	];

	constructor(level: LogLevel) {
		super(level);
	}

	/**
	 * Get all the different log parts for styling purposes
	 * @param {LogEntry} logEntry
	 * @private
	 */
	private _getLogParts(logEntry: LogEntry) {
		const levelColor = this.logLevelColors[logEntry.level];
		return [
			{
				partName: 'level',
				styles: `${levelColor} font-weight: bold; font-size: 1.1em`,
				value: `%c${LogLevelNameMap[logEntry.level]} - `
			},
			{partName: 'date', styles: 'color: default;', value: `%c${logEntry.entryDate} - `},
			{partName: 'message', styles: levelColor, value: `%c${logEntry.message}`}
		];
	}

	/**
	 * Add formatting to the message to be displayed
	 * @param logEntry
	 * @returns {FormattedMessage}
	 */
	formatMessage(logEntry: LogEntry) {
		let message = '';
		const logParts = this._getLogParts(logEntry);
		const replacementVars: any[] = [];
		logParts.forEach((logPart) => {
			if (logPart.partName !== 'date' || (logPart.partName === 'date' && logEntry.logWithDate)) {
				message += logPart.value;
				replacementVars.push(logPart.styles);
			}
		});
		return {message, replacementVars};
	}

	/**
	 * Show the log message
	 * @param logEntry
	 * @returns {LogEntry}
	 */
	log(logEntry: LogEntry) {
		const formatMsg = this.formatMessage(logEntry);
		let message = formatMsg.message;
		let vars = formatMsg.replacementVars;
		if (logEntry.params && logEntry.params.length) {
			message += ' %o';
			vars = [...formatMsg.replacementVars, ...logEntry.params];
		}
		// Send message to console
		console.log(message, ...vars);
		return logEntry;
	}
}

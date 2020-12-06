import {ApiMethod} from '@core/interfaces/api.interface';
import {LogLevel} from '@core/interfaces/logger.interface';
import {AuthService} from '@core/services/auth/auth.service';
import {HttpService} from '@core/services/http/http.service';
import {AbstractTransport} from '@core/services/logger/abstract-transport';
import {LogEntry} from '@core/services/logger/log-entry';
import {ServiceLocator} from '@core/services/service-locator';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export class HttpTransport extends AbstractTransport {
	readonly logWithDate = true;
	readonly shouldPersist = true;
	readonly shouldNotifyUser = false;
	logs: BehaviorSubject<LogEntry[]> = new BehaviorSubject<LogEntry[]>([]);
	flushThreshold: number = 10;
	flushIntervalMs: number = 60000; // 600000;
	flushInterval: any;

	constructor(level: LogLevel) {
		super(level);
		this.listenToLogs();
		// Setup an interval to flush every 10 minutes (600000ms)(flushIntervalMs)
		this.flushInterval = setInterval(() => {
			this.flush();
		}, this.flushIntervalMs);
	}

	/**
	 * Listen to the logs array. If we get a certain amount or reach a time
	 * threshold then send the log entries to the backend to be persisted and
	 * clear the array
	 */
	listenToLogs() {
		this.logs
			.subscribe((logs) => {
				if (logs && logs.length && logs.length === this.flushThreshold) {
					this.flush();
				}
			});
	}

	/**
	 * Just adds the log entry to the logs array
	 * @param logEntry
	 * @returns {LogEntry}
	 */
	log(logEntry: LogEntry) {
		const authService: AuthService = ServiceLocator.injector.get(AuthService);
		logEntry.user = authService.getUser(); // todo: causes circular dependency
		const currentLogs = this.logs.value;
		if (logEntry.shouldPersist) {
			const newLogs = [...currentLogs, logEntry];
			this.logs.next(newLogs);
		}
		return logEntry;
	}

	/**
	 * Sends the logs array to the server
	 */
	flush() {
		const logs = Array.from(this.logs.value);
		this.logs.next([]);
		if (logs.length > 0) {
			const httpService: HttpService = ServiceLocator.injector.get(HttpService); // todo: causes circular dependency
			httpService.doRequest('/api/logs', ApiMethod.POST, logs)
				.pipe(catchError((err) => {
					return throwError(err);
				}))
				.subscribe((response) => {
					// console.log('flush subscribe response', response);
				}, (err) => {
					// console.log('flush subscribe error', err);
				});
		}
	}
}

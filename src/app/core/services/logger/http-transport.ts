import {HttpClient} from '@angular/common/http';
import {ApiMethod} from '@core/interfaces/api.interface';
import {AppState} from '@core/root-store/models/app-state.model';
import {HttpService} from '@core/services/http/http.service';
import {LogLevel} from '@core/services/logger/logger.interface';
import {AbstractTransport} from '@core/services/logger/abstract-transport';
import {LogEntry} from '@core/services/logger/log-entry';
import {ServiceLocator} from '@core/services/service-locator';
import {Store} from '@ngrx/store';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export class HttpTransport extends AbstractTransport {
	/**
	 * Set to true to include the date in the logging message
	 */
	readonly logWithDate = true;
	/**
	 * Set to true if entries should be persisted to db
	 */
	readonly shouldPersist = true;
	/**
	 * Set to true if entries should notify the user
	 */
	readonly shouldNotifyUser = false;
	/**
	 * The log entries that will be sent to the server
	 */
	logs: BehaviorSubject<LogEntry[]> = new BehaviorSubject<LogEntry[]>([]);
	/**
	 * The number of logs to hold before sending to the server
	 */
	flushThreshold: number = 10;
	/**
	 * The interval to flush the logs. If we never reach the flushThreshold this will
	 * ensure the logs are sent
	 */
	flushIntervalMs: number = 60000;
	/**
	 * The interval method so we can clear/stop the interval
	 */
	flushInterval: any;
	/**
	 * The application state when the error occurred
	 * @private
	 */
	private appState;
	private storeListener;

	constructor(level: LogLevel) {
		super(level);
		this.listenToLogs();
		// Setup an interval to flush every 10 minutes (600000ms)(flushIntervalMs)
		this.flushInterval = setInterval(() => {
			this.flush();
		}, this.flushIntervalMs);
	}

	/**
	 * Listen to the ngrx-store application state. Anytime it changes
	 * update the local appState property. This is to include the application
	 * state in error messages
	 * @private
	 */
	private _listenToStore() {
		ServiceLocator.observableInjector
			.subscribe((injector) => {
				if (injector && !this.storeListener) {
					const store = injector.get(Store);
					this.storeListener = store.select((appState: AppState) => appState)
						.subscribe((appState) => {
							this.appState = {...appState};
						});
				}
			});
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
		const currentLogs = this.logs.value;
		if (logEntry.shouldPersist) {
			logEntry.params.push(this.appState);
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
		if (logs.length > 0) {
			const httpService = ServiceLocator.injector.get(HttpService);
			httpService.doRequest('/api/logs', ApiMethod.POST, logs)
				.pipe(catchError((err) => {
					return throwError(err);
				}))
				.subscribe((response) => {
					this.logs.next([]);
				});
		}
	}
}

import {LogLevel} from '@core/services/logger/logger.interface';
import {User} from '@core/models/user.model';

export class LogEntry {
	/**
	 * The date this entry was created
	 */
	entryDate: string = new Date().toISOString();
	/**
	 * Set to true to include the date in the log output
	 * @private
	 */
	private _logWithDate = true;
	/**
	 * Set to true to persist to a database. Only works if the {@link AbstractTransport}
	 * supports it
	 * @private
	 */
	private _shouldPersist = false;
	/**
	 * Set to true to display a toast message to notify the user
	 * @private
	 */
	private _shouldNotifyUser = false;
	/**
	 * The user for the log entry
	 * @private
	 */
	private _user: User;

	constructor(
		public level: LogLevel,
		public message: string,
		public params?: any[]
	) {}

	get logWithDate() {
		return this._logWithDate;
	}

	set logWithDate(logWithDate: boolean) {
		this._logWithDate = logWithDate;
	}

	get shouldPersist() {
		return this._shouldPersist;
	}

	set shouldPersist(shouldPersist: boolean) {
		this._shouldPersist = shouldPersist;
	}

	get shouldNotifyUser() {
		return this._shouldNotifyUser;
	}

	set shouldNotifyUser(shouldNotifyUser) {
		this._shouldNotifyUser = shouldNotifyUser;
	}

	get user() {
		return this._user;
	}

	set user(user) {
		this._user = user;
	}

	/**
	 * Convert this log entry to JSON
	 */
	toJson() {
		return JSON.parse(JSON.stringify(this));
	}

	/**
	 * Convert this log entry to a JSON string
	 */
	toString() {
		return JSON.stringify(this);
	}

	/**
	 * Convert this to a formatted JSON string
	 */
	toFormattedString() {
		return JSON.stringify(this, null, 2);
	}
}

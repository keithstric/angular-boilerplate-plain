import {LogLevel} from '@core/interfaces/logger.interface';
import {User} from '@core/models/user.model';

export class LogEntry {
	entryDate: string = new Date().toISOString();
	private _logWithDate = true;
	private _shouldPersist = false;
	private _shouldNotifyUser = false;
	private _user: User;

	constructor(
		public level: LogLevel,
		public message: string,
		public params?: any[]) {}

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

	toJson() {
		return JSON.parse(JSON.stringify(this));
	}

	toString() {
		return JSON.stringify(this);
	}

	toFormattedString() {
		return JSON.stringify(this, null, 2);
	}
}
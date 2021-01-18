import {LogLevel} from '@core/interfaces/logger.interface';
import {name, version} from 'package.json';

export const environment = {
	production: true
};

export const PROJECT_VERSION = version;
export const PROJECT_NAME = name;
export const DEBUG_DIALOGS = false;
export const LOG_LEVEL = LogLevel.info;

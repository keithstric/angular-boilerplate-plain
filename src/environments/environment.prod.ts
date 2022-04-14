import {LogLevel} from '@core/services/logger/logger.interface';
import packageInfo from 'package.json';

export const environment = {
	production: true
};

export const PROJECT_VERSION = packageInfo.version;
export const PROJECT_NAME = packageInfo.name;
export const DEBUG_DIALOGS = false;
export const LOG_LEVEL = LogLevel.info;

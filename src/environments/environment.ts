// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {LogLevel} from '@core/services/logger/logger.interface';
import packageInfo from '../../package.json';

export const environment = {
	production: false
};

/**
 * App version from package.json
 * @type {string}
 */
export const PROJECT_VERSION = packageInfo.version;

/**
 * App name from package.json
 * @type {string}
 */
export const PROJECT_NAME = packageInfo.name;

/**
 * Set to true for error dialogs to be shown
 * @type {boolean}
 */
export const DEBUG_DIALOGS = false;

/**
 * The application logging level. Set this to the highest logging
 * level you want to be used. If you look at the LogLevel enum, each level
 * is an integer with silly being 5 and error being 0. So setting the
 * LogLevel to info (2) all lower logging levels WILL also be logged (i.e. warn (1) and error (0))
 * but verbose (3), debug (4) and silly (5) will NOT be logged.
 */
export const LOG_LEVEL = LogLevel.debug;
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.

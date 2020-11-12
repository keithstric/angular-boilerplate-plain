import {Injectable} from '@angular/core';
import {LocalStorageTypes} from '@core/interfaces/local-storage.interface';
import {PROJECT_NAME} from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	prefix: string = PROJECT_NAME;

	constructor() {
	}

	/**
	 * Get the storage facility
	 * @param storageType {LocalStorageTypes}
	 * @private
	 * @returns {localStorage|sessionStorage}
	 */
	private static _getStorage(storageType: LocalStorageTypes) {
		return storageType === LocalStorageTypes.LOCAL ? localStorage : sessionStorage;
	}

	/**
	 * Get a localStorage or sessionStorage item value
	 * @param storageType {'local'|'session'}
	 * @param varName {string}
	 */
	getItem(storageType: LocalStorageTypes, varName: string) {
		const storage = LocalStorageService._getStorage(storageType);
		const val = storage.getItem(`${this.prefix}:${varName}`);
		try {
			return JSON.parse(val);
		} catch (e) {
			return val;
		}
	}

	/**
	 * Set a localStorage or sessionStorage item value
	 * @param storageType {LocalStorageTypes}
	 * @param varName {string}
	 * @param value {any}
	 */
	setItem(storageType: LocalStorageTypes, varName: string, value: any) {
		const storage = LocalStorageService._getStorage(storageType);
		const val = typeof value === 'string' ? value : JSON.stringify(value);
		storage.setItem(`${this.prefix}:${varName}`, val);
	}

	/**
	 * Remove an item from localStorage or sessionStorage
	 * @param storageType {LocalStorageTypes}
	 * @param varName {string}
	 */
	removeItem(storageType: LocalStorageTypes, varName: string) {
		const storage = LocalStorageService._getStorage(storageType);
		storage.removeItem(`${this.prefix}:${varName}`);
	}

}

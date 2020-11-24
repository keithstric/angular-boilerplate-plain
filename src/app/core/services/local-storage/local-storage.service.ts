import {Injectable} from '@angular/core';
import {LocalStorageTypes} from '@core/interfaces/local-storage.interface';
import {PROJECT_NAME} from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

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
	static getItem(storageType: LocalStorageTypes, varName: string) {
		const storage = LocalStorageService._getStorage(storageType);
		const val = storage.getItem(`${PROJECT_NAME}:${varName}`);
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
	static setItem(storageType: LocalStorageTypes, varName: string, value: any) {
		const storage = LocalStorageService._getStorage(storageType);
		const val = typeof value === 'string' ? value : JSON.stringify(value);
		storage.setItem(`${PROJECT_NAME}:${varName}`, val);
	}

	/**
	 * Remove an item from localStorage or sessionStorage
	 * @param storageType {LocalStorageTypes}
	 * @param varName {string}
	 */
	static removeItem(storageType: LocalStorageTypes, varName: string) {
		const storage = LocalStorageService._getStorage(storageType);
		storage.removeItem(`${PROJECT_NAME}:${varName}`);
	}

}

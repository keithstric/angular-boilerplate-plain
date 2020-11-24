import {createModel, Mapping, Model} from '@core/models/model';

export interface RawUser {
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

export interface ChangeUserPassword {
	new_password: string;
	password: string;
	verify_password: string;
}

export interface ForgotUserPassword {
	email: string;
	new_password: string;
	verify_password: string;
}

class UserMapping extends Mapping<RawUser> {
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;

	/**
	 * The current user's initials
	 * @returns {string}
	 */
	get initials() {
		return `${this.first_name.charAt(0).toUpperCase()}${this.last_name.charAt(0).toUpperCase()}`;
	}

	/**
	 * The current user's full name
	 * @returns {string}
	 */
	get fullName() {
		return `${this.first_name} ${this.last_name}`;
	}
}

export interface User extends Model<UserMapping> { }

export const User = createModel<User>(UserMapping);

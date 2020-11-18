import {Action} from '@ngrx/store';
import {User} from '@shared/models/user.model';

export enum UserActionTypes {
	CREATE_USER = '[USER] Create',
	UPDATE_USER = '[USER] Update',
	GET_USER = '[USER] Get',
	DELETE_USER = '[USER] Delete'
}

export class CreateUserAction implements Action {
	readonly type = UserActionTypes.CREATE_USER;

	constructor(public payload: User) {}
}

export class UpdateUserAction implements Action {
	readonly type = UserActionTypes.UPDATE_USER;

	constructor(public payload: User) {}
}

export class GetUserAction implements Action {
	readonly type = UserActionTypes.GET_USER;

	constructor(public payload: string) {}
}

export class DeleteUserAction implements Action {
	readonly type = UserActionTypes.DELETE_USER;

	constructor(public payload: string) {}
}

export type UserAction = CreateUserAction | UpdateUserAction | GetUserAction | DeleteUserAction;


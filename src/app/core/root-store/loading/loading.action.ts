import {Action} from '@ngrx/store';

export enum LoadingActionTypes {
	SET_LOADING = '[ROOT] Set Loading'
}

export class SetLoadingAction implements Action {
	readonly type = LoadingActionTypes.SET_LOADING;
	constructor(public payload: boolean){}
}

export type LoadingAction = SetLoadingAction;

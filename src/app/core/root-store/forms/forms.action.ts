import {Action} from '@ngrx/store';

export enum FormActionTypes {
	ADD_FORM = '[FORMS] Add Form',
	PATCH_FORM = '[FORMS] Patch Form'
}

export class AddFormAction implements Action {
	readonly type = FormActionTypes.ADD_FORM;
	constructor(public payload: {path: string, value: any}) {}
}

export class PatchFormAction implements Action {
	readonly type = FormActionTypes.PATCH_FORM;
	constructor(public payload: {path: string, value: any}) {}
}

export type FormsAction = PatchFormAction
	| AddFormAction;

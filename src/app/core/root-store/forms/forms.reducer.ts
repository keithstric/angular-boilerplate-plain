import {FormActionTypes, FormsAction} from '@core/root-store/forms/forms.action';
import {AppState} from '@core/root-store/models/app-state.model';

export interface IFormsState {
	[key: string]: any;
}

export const formsInitialState = {};

export function formsReducer(state: IFormsState = formsInitialState, action: FormsAction) {
	switch (action.type) {
		case FormActionTypes.ADD_FORM:
			return {...state, [action.payload.path]: action.payload.value};
		case FormActionTypes.PATCH_FORM:
			return {...state, [action.payload.path]: action.payload.value};
	}
	return state;
}

export const getFormsState = (state: AppState): IFormsState => state.forms || {};

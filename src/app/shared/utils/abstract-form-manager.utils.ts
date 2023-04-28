import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {FormControlStatus} from '@shared/services/form-helper/form-helper.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';


type AppFormControl<T extends AbstractControl> = T;
/**
 * Fill in your own event names here.
 * This enum is meant to drive notifications between multiple forms on the same page. For example, if
 * on tab1 you cnange a value and tab3 needs to be informed about that change, you would want
 * an action to be fired that the form manager for tab3 could pick up.
 */
export enum FormManagerEvents {
	REPLACE_ME_WITH_A_MEANINGFUL_EVENT_NAME
}
/**
 * An event object that contains the event name and any required data that needs to be
 * passed to the event
 */
export type FormManagerEvent = {eventName: FormManagerEvents, data: any};

/**
 * This class is meant to assist in multi-form validation scenarios (i.e. form3's validity needs
 * to be reported to a parent component). It is also meant to facilitate multi-form/parent communication.
 * For example, you have 2 forms. When the value on form 1 changes, you need to validate or change something on
 * form 2. This class is meant to assist with that sort of functionality.
 */
export abstract class FormManager {
	formControl: AppFormControl<FormGroup | FormArray>;
	/**
	 * Once the form is built, set value to true. Used by parent form managers to listen if child
	 * form managers are ready, so we can report validity appropriately
	 */
	ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	/**
	 * All subscriptions in sub form managers should be added to this
	 */
	subscriptions: Subscription = new Subscription();
	/**
	 * Subscribe to this from a parent component, then when this form manager
	 * announces events, the parent will be aware and can perform whatever logic
	 * may be needed based on that change
	 */
	eventAnnouncerSubj = new Subject<FormManagerEvent>();

	/**
	 * Each form manager should be responsible for constructing it's own summary
	 * value which can be passed along to other components
	 */
	abstract get summaryValue(): any;

	/**
	 * get validity of form
	 */
	get isValid(): boolean {
		return this.formControl.valid;
	}

	/**
	 * get form's valueChanges listener
	 */
	get valueListener(): Observable<any> {
		return this.formControl.valueChanges;
	}

	/**
	 * get form's statusChanges listener
	 */
	get statusListener(): Observable<FormControlStatus> {
		return this.formControl.statusChanges;
	}

	/**
	 * Called in parent's onDestroy
	 */
	destroy() {
		this.ready.next(false);
		this.formControl = undefined;
		this.subscriptions.unsubscribe();
	}

	announceEvent(formManagerEvent: FormManagerEvent) {
		this.eventAnnouncerSubj.next(formManagerEvent);
	}
}

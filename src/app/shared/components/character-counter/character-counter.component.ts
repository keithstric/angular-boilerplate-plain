import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface iCharacterCounterEvent {
	charCount: number;
	control: AbstractControl | HTMLInputElement | HTMLTextAreaElement;
}

@Component({
	selector: 'app-character-counter',
	templateUrl: './character-counter.component.html',
	styleUrls: ['./character-counter.component.scss']
})
export class CharacterCounterComponent implements OnInit, OnDestroy {
	/**
	 * count "up" or "down"
	 * up = counts from 0 to max
	 * down = counts from max to 0
	 */
	@Input() counterType: 'up' | 'down' = 'up';
	/**
	 * The FormControl this counter is for
	 */
	@Input() control: AbstractControl;
	/**
	 * An html element to listen to. Will listen to the
	 * input event to update the counter. Will generally be
	 * an <input> or <textarea>
	 */
	@Input() htmlControl: HTMLInputElement | HTMLTextAreaElement;
	/**
	 * What the maximum count should be
	 */
	@Input() max: number;
	/**
	 * Text to display in front of the count
	 */
	@Input() prefixText: string;
	/**
	 * Text to display after the count
	 */
	@Input() suffixText: string;
	/**
	 * Hide the counter until this number is reached
	 */
	@Input() hideUntilCount: number = 0;
	/**
	 * true to hide the counter once the max has been reached
	 */
	@Input() hideMaxExceeded: boolean = false;
	/**
	 * Once the max is reached, emit an event
	 */
	@Output() maxReached: EventEmitter<iCharacterCounterEvent> = new EventEmitter();
	/**
	 * Once the max is exceeded, emit an event
	 */
	@Output() maxExceeded: EventEmitter<iCharacterCounterEvent> = new EventEmitter();

	remainingCount: number;
	currentCount: number = 0;
	hidden: boolean = false;
	subscriptions: Subscription = new Subscription();

	constructor() {}

	ngOnInit(): void {
		if (this.control) {
			this.currentCount = this.control.value.length;
			this.remainingCount = this.max - this.currentCount;
			this._setHidden();
			this.listenToControlValueChanges();
		}
		if (this.htmlControl) {
			this.currentCount = this.htmlControl.value.length;
			this.remainingCount = this.max - this.currentCount;
			this._setHidden();
			this.listenToHtmlControlValueChanges();
		}
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Listen to value changes for the control and update the remaining and current counts
	 */
	listenToControlValueChanges() {
		this.subscriptions.add(this.control.valueChanges
			.subscribe((value) => {
				this._valueChangeHandler(value, this.control);
			}));
	}

	/**
	 * Fired on the control's input event, updates the remaining and current counts
	 */
	listenToHtmlControlValueChanges() {
		this.htmlControl.oninput = (evt: InputEvent) => {
			// console.log('htmlControl.oninput', evt.data);
			this._valueChangeHandler(evt.data, this.htmlControl);
		};
	}

	/**
	 * Handler for control's value change, updates the remaining and current counts
	 * @param value
	 * @param ctrl
	 * @private
	 */

	/**
	 * Handle value changes. Updates the remaining and current counts
	 * @param value
	 * @param ctrl
	 * @private
	 */
	private _valueChangeHandler(value: string, ctrl: HTMLInputElement | HTMLTextAreaElement | AbstractControl) {
		if (value) {
			this.remainingCount = this.max - value.length;
			this.currentCount = value.length;
			this._setHidden();
			if (value.length === this.max) {
				this.maxReached.emit({charCount: value.length, control: ctrl});
			}
			if (value.length > this.max) {
				this.maxExceeded.emit({charCount: value.length, control: ctrl});
			}
		}else{
			this.remainingCount = this.max;
			this.currentCount = 0;
			this._setHidden();
		}
	}

	/**
	 * Hide the component
	 * @private
	 */
	private _setHidden() {
		this.hidden = this.currentCount <= this.hideUntilCount;
		if (this.hideMaxExceeded && this.currentCount > this.max) {
			this.hidden = true;
		}
	}
}

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * Bypass security and trust the given value to be safe HTML. Will allow script
 * and style tags. USE WITH CAUTION
 */
@Pipe({
	name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

	constructor(
		private sanitizer: DomSanitizer
	) {}

	transform(value: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

}

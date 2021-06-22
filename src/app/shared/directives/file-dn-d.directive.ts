import {Directive, HostListener, EventEmitter, Output} from '@angular/core';

/**
 * This directive is for supporting dragging and dropping a file onto a drop zone
 *
 * @example
 * <div class="drop-zone" appFileDnD>
 *   ...
 * </div>
 */
@Directive({
	selector: '[appFileDnD]'
})
export class FileDnDDirective {
	@Output() fileDropped: EventEmitter<any> = new EventEmitter<any>();

	constructor() {}

	@HostListener('dragover', ['$event']) onDragOver(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		// console.log('FileDnDDirective, onDragOver', evt);
	}

	@HostListener('dragleave', ['$event']) onDragLeave(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		// console.log('FileDnDDirective, onDragLeave', evt);
	}

	@HostListener('drop', ['$event']) onDrop(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		const files = evt.dataTransfer.files;
		if (files?.length) {
			this.fileDropped.emit(files);
		}
	}
}

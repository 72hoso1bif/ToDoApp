import {
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[appFilePicker]',
  exportAs: 'appFilePicker',
})
export class FilePickerDirective implements OnDestroy, OnChanges {

  /**
   * Selected Files
   */
  get files(): FileList | undefined {
    return this._nativeFileElement.files;
  }

  /**
   * Native input[type=file] element.
   */
  get nativeFileElement() {
    return this._nativeFileElement;
  }

  constructor(
    @Optional() @Inject(DOCUMENT) private _document: Document,
  ) {
    if (this._document) {
      this._form = this._document.createElement('form');
      this._nativeFileElement = this._document.createElement('input');
      this._nativeFileElement.type = 'file';
      this._nativeFileElement.accept = 'image/*';
      this._nativeFileElement.addEventListener('change', this._onFilesChanged);
      this._form.appendChild(this.nativeFileElement);
    }
  }

  private _form: HTMLFormElement;

  /**
   * File list emitted on change.
   */
  @Output()
  filesChanged = new EventEmitter<FileList>();

  /**
   * File list emitted on change.
   */
  @Output()
  filesReset = new EventEmitter();
  private _nativeFileElement: HTMLInputElement;

  /**
   * Prevent dragover event so drop events register.
   */
  @HostListener('dragover', ['$event'])
  _onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Set files on drop.
   * Emit selected files.
   */
  @HostListener('drop', ['$event'])
  _drop(event: DragEvent) {
    event.preventDefault();
    this._nativeFileElement.files = event.dataTransfer.files;
    this._onFilesChanged();
  }

  /**
   * Invoke file browse on click.
   */
  @HostListener('click', ['$event'])
  _onClick(event: Event) {
    event.preventDefault();
    this._nativeFileElement.click();
  }

  private _onFilesChanged = () => {
    this.filesChanged.emit(this._nativeFileElement.files);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    this._nativeFileElement.removeEventListener('change', this._onFilesChanged);
    this._nativeFileElement.remove();
    this._form.remove();
  }

  /**
   * Reset file list.
   */
  reset() {
    this._form.reset();
    this.filesReset.emit();
  }
}

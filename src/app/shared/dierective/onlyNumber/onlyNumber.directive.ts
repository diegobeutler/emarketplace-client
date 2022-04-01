import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[onlyNumber]',
})
export class OnlyNumberDirective {

  constructor(private element: ElementRef<HTMLInputElement>) {
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    const value = this.element.nativeElement.value;
    this.element.nativeElement.value = value.replace(/[^0-9]*/g, '');

    if (value !== this.element.nativeElement.value) {
      this.element.nativeElement.dispatchEvent(new Event('input'));
      event.stopPropagation();
    }

  }
}

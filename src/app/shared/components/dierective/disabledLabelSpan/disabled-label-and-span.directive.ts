import {Directive, DoCheck, ElementRef, Input} from "@angular/core";

@Directive({selector: '[disabledLabelAndSpan]'})
export class DisabledLabelAndSpanDirective implements DoCheck {

  @Input()
  disabledLabelAndSpan: boolean;

  constructor(private elementRef: ElementRef) {
  }

  ngDoCheck(): void {
    const label = this.elementRef.nativeElement.querySelector('label');
    const span = this.elementRef.nativeElement.querySelector('span');
    if (this.disabledLabelAndSpan) {
      if (span) {
        span.style.display = 'none';
      }
      label.classList.add('disabled');
    } else {
      if (span) {
        span.style.display = 'inline';
      }
      label.classList.remove('disabled');
    }
  }
}

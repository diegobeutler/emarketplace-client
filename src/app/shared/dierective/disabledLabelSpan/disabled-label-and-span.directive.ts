import {Directive, DoCheck, ElementRef, Input} from "@angular/core";

@Directive({selector: '[disabledLabelAndSpan]'})
export class DisabledLabelAndSpanDirective implements DoCheck {

  @Input()
  disabledLabelAndSpan: boolean;

  constructor(private elementRef: ElementRef) {
  }

  ngDoCheck(): void {
    const label = this.elementRef.nativeElement.querySelector('label');
    const span = this.elementRef.nativeElement.getElementsByClassName('obrigatorio')[0];
    if (this.disabledLabelAndSpan) {
      if (span) {
        span.style.display = 'none';
      }
      if (label)
        label.classList.add('disabled');
    } else {
      if (span) {
        span.style.display = 'inline';
      }
      if (label)
        label.classList.remove('disabled');
    }
  }
}

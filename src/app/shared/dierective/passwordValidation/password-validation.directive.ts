import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import * as $ from 'jquery';

@Directive({
  selector: '[validatePassword][formControlName],[validatePassword][formControl],[validatePassword][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidationDirective), multi: true }
  ]
})
export class PasswordValidationDirective implements Validator {
  constructor() {}

  validate(c: AbstractControl): { [key: string]: any } {
    // expressão regular para senha forte
    const regexSenhaForte = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');
    const senha = c.value;
    if (!senha || senha.match(regexSenhaForte)){

      $("#password").removeClass('ng-dirty ng-invalid');
      // @ts-ignore
      return null;
    } else {
      $("#password").addClass('ng-dirty ng-invalid');
      return {
        validatePassword: false
      }
    }
  }
}

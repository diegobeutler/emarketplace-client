import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PasswordValidationDirective} from "./password-validation.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PasswordValidationDirective,
  ],
  exports: [
    PasswordValidationDirective,
  ],
})
export class PasswordValidationModule {

}

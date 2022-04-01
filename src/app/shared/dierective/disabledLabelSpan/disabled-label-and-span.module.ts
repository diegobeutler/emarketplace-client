import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DisabledLabelAndSpanDirective} from "./disabled-label-and-span.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DisabledLabelAndSpanDirective,
  ],
  exports: [
    DisabledLabelAndSpanDirective,
  ],
})
export class DisabledLabelAndSpanModule {

}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DisabledLabelAndSpanDirective} from "../dierective/disabledLabelSpan/disabled-label-and-span.directive";
import {FileService} from "./file.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [], providers: [FileService],

  exports: [],
})
export class FileModule {
}

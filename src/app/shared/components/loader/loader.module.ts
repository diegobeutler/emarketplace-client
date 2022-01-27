import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./loader.component";
import {ProgressBarModule} from "primeng/progressbar";

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  exports: [
    LoaderComponent
  ],
  declarations: [
    LoaderComponent
  ]
})
export class LoaderModule {

}

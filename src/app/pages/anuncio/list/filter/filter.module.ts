import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "./filter.component";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TooltipModule} from "primeng/tooltip";
import {
  DisabledLabelAndSpanModule
} from "../../../../shared/dierective/disabledLabelSpan/disabled-label-and-span.module";
import {FormsModule} from "@angular/forms";
import {EnderecoModule} from "../../../endereco/endereco.module";
import {OnlyNumberModule} from "../../../../shared/dierective/onlyNumber/onlyNumber.module";
import {CategoriaModule} from "../../../categoria/categoria.module";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AutoCompleteModule,
    TooltipModule,
    DisabledLabelAndSpanModule,
    FormsModule,
    EnderecoModule,
    OnlyNumberModule,
    CategoriaModule,
    InputTextModule,
    CalendarModule,
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule {
}

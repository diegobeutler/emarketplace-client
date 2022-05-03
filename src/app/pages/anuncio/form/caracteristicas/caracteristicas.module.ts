import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaracteristicasComponent} from "./caracteristicas.component";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [CaracteristicasComponent],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule
  ],
  exports: [
    CaracteristicasComponent
  ]
})
export class CaracteristicasModule {
}

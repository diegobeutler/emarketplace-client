import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnuncioListComponent} from "./anuncio-list.component";
import {FilterModule} from "./filter/filter.module";
import {AnunciosComponent} from "./anuncios/anuncios.component";
import {AnuncioCardComponent} from "./card/anuncio-card/anuncio-card.component";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {GalleriaModule} from "primeng/galleria";
import {DialogModule} from "primeng/dialog";
import {CaracteristicasModule} from "../form/caracteristicas/caracteristicas.module";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {InputTextModule} from "primeng/inputtext";
import {DisabledLabelAndSpanModule} from "../../../shared/dierective/disabledLabelSpan/disabled-label-and-span.module";

@NgModule({
  declarations: [
    AnuncioListComponent,
    AnunciosComponent,
    AnuncioCardComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    DialogModule,
    CaracteristicasModule,
    AutoCompleteModule,
    FormsModule,
    TooltipModule,
    InputTextModule,
    DisabledLabelAndSpanModule
  ],
  exports: [
    AnuncioListComponent,
    AnunciosComponent,
    AnuncioCardComponent
  ]
})
export class AnuncioListModule {
}

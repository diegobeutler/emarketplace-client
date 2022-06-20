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
import {UsuarioDialogComponent} from "./card/usuario-dialog/usuario-dialog.component";
import {CheckboxModule} from "primeng/checkbox";
import {MoneyFormatPipeModule} from "../../../shared/pipes/moneyFormat/moneyFormat.pipe.module";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    AnuncioListComponent,
    AnunciosComponent,
    AnuncioCardComponent,
    UsuarioDialogComponent
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
        DisabledLabelAndSpanModule,
        CheckboxModule,
        MoneyFormatPipeModule,
        NgxMaskModule.forRoot(),
    ],
  exports: [
    AnuncioListComponent,
    AnunciosComponent,
    AnuncioCardComponent,
    UsuarioDialogComponent
  ]
})
export class AnuncioListModule {
}

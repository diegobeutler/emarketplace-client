import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnuncioListComponent} from "./anuncio-list.component";
import {FilterModule} from "./filter/filter.module";
import {AnunciosComponent} from "./anuncios/anuncios.component";
import {AnuncioCardComponent} from "./card/anuncio-card/anuncio-card.component";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {GalleriaModule} from "primeng/galleria";

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
  ],
  exports: [
    AnuncioListComponent,
    AnunciosComponent,
    AnuncioCardComponent
  ]
})
export class AnuncioListModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnuncioListComponent} from "./anuncio-list.component";
import {FilterModule} from "./filter/filter.module";


@NgModule({
  declarations: [
    AnuncioListComponent
  ],
  imports: [
    CommonModule,
    FilterModule
  ],
  exports: [
    AnuncioListComponent
  ]
})
export class AnuncioListModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoneyFormatPipe} from "./moneyFormat.pipe";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MoneyFormatPipe
  ],
  exports: [
    MoneyFormatPipe
  ]
})
export class MoneyFormatPipeModule { }

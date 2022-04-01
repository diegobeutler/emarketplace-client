import {NgModule} from "@angular/core";
import {EstadoService} from "./estado.service";
import {CidadeService} from "./cidade.service";
import {CommonModule} from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    EstadoService,
    CidadeService,
  ],
})
export class EnderecoModule { }

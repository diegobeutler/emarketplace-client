import {AnuncioComponent} from "./anuncio.component";
import {RouterModule, Routes} from "@angular/router";
import {AnuncioFormComponent} from "./form/anuncio-form.component";
import {AnuncioListComponent} from "./list/anuncio-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AnuncioService} from "./anuncio.service";
import {TokenInterceptor} from "../../shared/interceptors/token-interceptor.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {CardModule} from "primeng/card";
import {FileUploadModule} from "primeng/fileupload";
import {
  DisabledLabelAndSpanModule
} from "../../shared/components/dierective/disabledLabelSpan/disabled-label-and-span.module";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {CaracteristicasComponent} from './form/caracteristicas/caracteristicas.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {TooltipModule} from "primeng/tooltip";
import {CategoriaModule} from "../categoria/categoria.module";


const routes: Routes = [
  {path: '', component: AnuncioComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    TooltipModule,

    DisabledLabelAndSpanModule,
    CategoriaModule
  ],
  declarations: [
    AnuncioComponent,
    AnuncioFormComponent,
    AnuncioListComponent,
    CaracteristicasComponent,
  ],
  providers: [
    AnuncioService,
    TokenInterceptor,

    // interceptors
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true,},
  ],
})
export class AnuncioModule {
}

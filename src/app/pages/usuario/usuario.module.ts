import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {AutoCompleteModule} from "primeng/autocomplete";
import {UsuarioFormComponent} from "./usuario-form.component";
import {UsuarioService} from "./usuario.service";
import {NgxMaskModule} from "ngx-mask";
import {EnderecoModule} from "../endereco/endereco.module";
import {
  DisabledLabelAndSpanModule
} from "../../shared/components/dierective/disabledLabelSpan/disabled-label-and-span.module";
import {TooltipModule} from "primeng/tooltip";
import {FileModule} from "../../shared/components/file/file.module";

const routes: Routes = [
  { path: '', component: UsuarioFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
    ButtonModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),

    PanelModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    EnderecoModule,
    DisabledLabelAndSpanModule,
    TooltipModule,
    FileModule
  ],
  declarations: [
    UsuarioFormComponent,
  ],
  providers: [
    UsuarioService,
  ],
})
export class UsuarioModule { }

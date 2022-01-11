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
    PanelModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  declarations: [
    UsuarioFormComponent,
  ],
  providers: [
    UsuarioService,
  ],
})
export class LoginModule { }

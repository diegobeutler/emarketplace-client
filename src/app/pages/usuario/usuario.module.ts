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
import {UsuarioFormComponent} from "./form/usuario-form.component";
import {UsuarioService} from "./usuario.service";
import {NgxMaskModule} from "ngx-mask";
import {EnderecoModule} from "../endereco/endereco.module";
import {
  DisabledLabelAndSpanModule
} from "../../shared/components/dierective/disabledLabelSpan/disabled-label-and-span.module";
import {TooltipModule} from "primeng/tooltip";
import {TokenInterceptor} from "../../shared/interceptors/token-interceptor.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';
import {CheckboxModule} from "primeng/checkbox";
import {
  PasswordValidationModule
} from "../../shared/components/dierective/passwordValidation/password-validation.module";

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
    CheckboxModule,
    TooltipModule,
    DividerModule,
    PasswordModule,
    AutoCompleteModule,

    EnderecoModule,
    DisabledLabelAndSpanModule,
    PasswordValidationModule
  ],
  declarations: [
    UsuarioFormComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
  ],
  providers: [
    UsuarioService,
    TokenInterceptor,

    // interceptors
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
  ],
})
export class UsuarioModule { }

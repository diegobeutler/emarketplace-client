import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {CardModule} from 'primeng/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {RouterModule, Routes} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
// import {ConfiguracaoFilialService} from "../../fiscal/configuracaoFilial/configuracaoFilial.service";
// import {ValidationModule} from "../../framework/validation/validation.module";
// import {SafeHtmlPipeModule} from "ng-vs-components";
// import {AcessoSistemaService} from "@app/master/acessoSistema/acessoSistema.service";

const routes: Routes = [
  { path: '', component: LoginComponent }
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
      ReactiveFormsModule
    ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
  ],
})
export class LoginModule { }

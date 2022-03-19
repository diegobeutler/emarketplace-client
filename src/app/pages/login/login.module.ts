import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {CardModule} from 'primeng/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {RouterModule, Routes} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule} from "primeng/autocomplete";
import {PasswordModule} from "primeng/password";
import {ProgressBarModule} from "primeng/progressbar";
import {
  PasswordValidationModule
} from "../../shared/components/dierective/passwordValidation/password-validation.module";

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
        ReactiveFormsModule,
        AutoCompleteModule,
        PasswordModule,
        ProgressBarModule,
        PasswordValidationModule
    ],
  declarations: [
    LoginComponent,
  ],
  providers: [
  ],
})
export class LoginModule { }

import {Component, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {LoginService} from "./login.service";
import {LoginRequest} from "../../shared/models/login-request";
import {MessageService} from "primeng/api";
import {errorTransform} from "../../shared/pipes/error-transform";
import {LoaderService} from "../../shared/components/loader/loader.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild(NgForm, {static: false}) form!: NgForm;
  registro: LoginRequest = {} as LoginRequest;

  constructor(private loginService: LoginService,
              private messageService: MessageService,
              private loaderService: LoaderService) {
  }


  acessar(): void {
    if (this.form.valid) {
      this.loaderService.show(true, "Aguarde, autenticando...");
      this.loginService.login(this.registro).subscribe(() => {

        this.loaderService.show(false);
        this.messageService.add({severity: 'success', detail: 'Usuário autenticado com sucesso!'});
      }, error => {
        this.loaderService.show(false);
        this.messageService.add({severity: 'error', detail: errorTransform(error)});
      });

    } else {// todo melhorar, isolar em uma classe util
      if (this.form.status !== 'DISABLED') {
        for (const eachControl in this.form.controls) {
          (<FormControl>this.form.controls[eachControl]).markAsDirty();
          (<FormControl>this.form.controls[eachControl]).updateValueAndValidity();
        }
        if(!this.registro.password){
          $("#password").addClass('ng-dirty ng-invalid');
          $("#component-password").remove('ng-valid');
          $("#component-password").addClass('ng-invalid');
        }
      }
    }
  }
}

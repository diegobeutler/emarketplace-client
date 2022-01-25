import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from "./login.service";
import {LoginRequest} from "../../shared/models/login-request";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild(NgForm, {static: false}) form!: NgForm;
  registro: LoginRequest = {} as LoginRequest;

  // submitted = false;
  constructor(private loginService: LoginService) {
  }


  acessar(): void {
    if (this.form.valid) {
      this.loginService.login(this.registro).subscribe(() => {
        alert("logou com sucesso")
        // this.loading = false;
        // this.dialog.closeAll();
      }, error => {
        console.log(error)
        // this.form.enable();
        // this.loading = false;
        // this.snackBar.open(errorTransform(error), 'Ok');
      });

    }
    // this.submitted = true;
    // alert(JSON.stringify(this.form.value));
  }

  login() {

  }
}

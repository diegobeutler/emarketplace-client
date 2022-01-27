import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {FormControl, NgForm} from "@angular/forms";
import {LoaderService} from "../../../shared/components/loader/loader.service";
import {MessageService} from "primeng/api";
import {errorTransform} from "../../../shared/pipes/error-transform";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild(NgForm, {static: false})
  form!: NgForm;
  username: string;
  constructor(private usuarioService: UsuarioService,
              private loaderService: LoaderService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  enviar() {
    if (this.form.valid) {
      this.loaderService.show(true, "Aguarde, enviando...")
      this.usuarioService.enviarEmailResetPassword(this.username).subscribe( e =>{
        this.loaderService.show(false);
        this.messageService.add({severity: 'success', detail: 'E-mail enviado com sucesso!'});
      }, error => {
          this.loaderService.show(false);
          this.messageService.add({severity: 'error', detail: errorTransform(error)});
        });
    } else {
      if (this.form.status !== 'DISABLED') {
        for (const eachControl in this.form.controls) {
          (<FormControl>this.form.controls[eachControl]).markAsDirty();
          (<FormControl>this.form.controls[eachControl]).updateValueAndValidity();
        }
      }
    }
  }
}

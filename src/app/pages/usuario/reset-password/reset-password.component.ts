import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild(NgForm, {static: false})
  form!: NgForm;
  username: string;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  enviar() {
    if (this.form.valid) {
      this.usuarioService.enviarEmailResetPassword(this.username).subscribe();
    }
  }
}

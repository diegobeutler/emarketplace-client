import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PasswordDto} from "./dto/passwordDto";
import {UsuarioService} from "../usuario.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  @ViewChild(NgForm, {static: false})
  form!: NgForm;
  passwordDto = {} as PasswordDto;

  constructor(private activatedRoute: ActivatedRoute,
              private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(e => this.passwordDto.token = e['token']);
  }

  redefinir(): void {
    if(this.form.valid ){
      this.usuarioService.updatePassword(this.passwordDto).subscribe();
    }
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PasswordDto} from "./dto/passwordDto";
import {UsuarioService} from "../usuario.service";
import {FormControl, NgForm} from "@angular/forms";
import {LoaderService} from "../../../shared/components/loader/loader.service";
import {MessageService} from "primeng/api";
import {errorTransform} from "../../../shared/pipes/error-transform";

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
              private usuarioService: UsuarioService,
              private loaderService: LoaderService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(e => this.passwordDto.token = e['token']);
  }

  redefinir(): void {
    if(this.form.valid){
      this.loaderService.show(true, "Aguarde, redefinindo...")
      this.usuarioService.updatePassword(this.passwordDto).subscribe( e => {
        this.loaderService.show(false);
        this.messageService.add({severity: 'success', detail: 'Senha redefinida com sucesso!'});
      }, error => {
        this.loaderService.show(false);
        this.messageService.add({severity: 'error', detail: errorTransform(error)});
      });
    } else {
      if (this.form.status !== 'DISABLED') { // todo melhorar, isolar em uma classe utils
        for (const eachControl in this.form.controls) {
          (<FormControl>this.form.controls[eachControl]).markAsDirty();
          (<FormControl>this.form.controls[eachControl]).updateValueAndValidity();
        }
      }
    }
  }
}

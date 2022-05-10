import {Component, Injector, Input} from '@angular/core';
import {SimpleCrudComponent} from "../../../shared/components/crud/simple-crud.component";
import {Usuario} from "../models/usuario";
import {UsuarioService} from "../usuario.service";
import {EstadoService} from "../../endereco/estado.service";
import {Estado} from "../../endereco/models/estado";
import {Cidade} from "../../endereco/models/cidade";
import {CidadeService} from "../../endereco/cidade.service";
import * as $ from 'jquery';
import {errorTransform} from "../../../shared/pipes/error-transform";

const DEFAULT_IMAGE = 'https://s3.sa-east-1.amazonaws.com/e-marketplace/images/users/defaultImage.jpg';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends SimpleCrudComponent<Usuario> {
  estados: Estado[];
  estado: Estado;
  cidades: Cidade[];
  file: string;

  constructor(protected service: UsuarioService,
              private estadoService: EstadoService,
              private cidadeService: CidadeService,
              injector: Injector) {
    super(service, injector);
  }

  afterCarregarRegistroExistente(): void {
    this.estado = this.registro?.cidade?.estado;
  }

  estadoComplete(event: any): void {
    this.estadoService.completeByNomeOrUf(event.query).subscribe(e => this.estados = e);
  }

  cidadeComplete(event: any): void {
    this.cidadeService.completeByEstadoAndNome(this.estado?.id!, event.query).subscribe(e => this.cidades = e);
  }

  afterCriarNovoRegistro(): void {
    this.registro.imagem = DEFAULT_IMAGE;
  }

  deleteFile(): void {
    if (!this.registro.imagem.startsWith("data") && this.registro.id) {
      this.registro.deleteImage = true;
    }
    this.registro.imagem = DEFAULT_IMAGE;
  }


  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.registro.deleteImage = false;

      const reader = new FileReader();
      reader.onload = () => {
        this.registro.imagem = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  showUpfile(): void {
    $("#upfile").click();
  }

  isDefaultImage(): boolean {
    return this.registro?.imagem?.indexOf('defaultImage') > 0;
  }

  afterSave() {
  }

  validarCadastro() {
    this.loaderService.show(true);
    this.service.validarCadastro(this.registro.id!).subscribe(e => {
      this.messageService.add({severity: 'success', detail: 'Registro validado com sucesso'});
      this.registro.ativo = true;
      this.loaderService.show(false);
    }, error => {
      this.loaderService.show(false);
      this.messageService.add({severity: 'error', detail: errorTransform(error)});
    })
  }

  clearEstado(): void {
    this.estado = null!;
    this.registro.cidade = null!;
  }
}

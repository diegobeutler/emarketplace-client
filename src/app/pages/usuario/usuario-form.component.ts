import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {SimpleCrudComponent} from "../../shared/components/crud/simple-crud.component";
import {Usuario} from "./models/usuario";
import {UsuarioService} from "./usuario.service";
import {EstadoService} from "../endereco/estado.service";
import {Estado} from "../endereco/models/estado";
import {Cidade} from "../endereco/models/cidade";
import {CidadeService} from "../endereco/cidade.service";
import {FileService} from "../../shared/components/file/file.service";

const DEFAULT_IMAGE = 'https://s3.sa-east-1.amazonaws.com/e-marketplace/images/users/defaultImage.jpg';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends SimpleCrudComponent<Usuario> implements OnInit {
  estados: Estado[];
  estado: Estado;
  cidades: Cidade[];
  file: string;

  constructor(protected service: UsuarioService,
              private estadoService: EstadoService,
              private cidadeService: CidadeService,
              private fileService: FileService,
              injector: Injector) {
    super(service, injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.estado = this.registro?.cidade?.estado;
  }

  estadoComplete(event: any) {
    this.estadoService.completeByNomeOrUf(event.query).subscribe(e => this.estados = e);
  }

  cidadeComplete(event: any) {
    this.cidadeService.completeByEstadoAndNome(this.estado?.id, event.query).subscribe(e => this.cidades = e);
  }

  afterCriarNovoRegistro() {
    this.registro.imagem = DEFAULT_IMAGE;
  }

  deleteFile() {
    if (!this.registro.imagem.startsWith("data") && this.registro.id) {
      this.registro.deleteImage = true;
    }
    this.registro.imagem = DEFAULT_IMAGE;
  }


  selectFile(event: any) {
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

  showUpfile() {
    // @ts-ignore
    document.getElementById("upfile").click();
  }

  isDefaultImage(): boolean {
    return this.registro.imagem.indexOf('defaultImage') > 0;
  }

  afterSave() {
    // this.router.navigateByUrl('login');
  }
}

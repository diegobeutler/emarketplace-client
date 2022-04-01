import {Component, Injector} from '@angular/core';
import {SimpleCrudComponent} from "../../../shared/components/crud/simple-crud.component";
import {Anuncio} from "../models/anuncio";
import {AnuncioService} from "../anuncio.service";
import {KeyValue} from "@angular/common";
import {Operacao} from "../enumeration/operacao";
import {CategoriaService} from "../../categoria/categoria.service";
import {Categoria} from "../../categoria/models/categoria";
import {SuggestionsUtils} from "../../../shared/utils/suggestionsUtils";
import {UsuarioService} from "../../usuario/usuario.service";
import {Usuario} from "../../usuario/models/usuario";

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent extends SimpleCrudComponent<Anuncio> {
  uploadedFiles: any[] = [];
  caracteristicas: Array<KeyValue<string, string>> = [];
  operacoesSugestions: Operacao[];
  categorias: Categoria[];
  instituicoes: Usuario[];
  readonly operacoesHasValor = [Operacao.DOACAO_VALOR, Operacao.VENDA, Operacao.EMPRESTIMO];
  readonly operacoesHasInstituicao = [Operacao.DOACAO_VALOR, Operacao.DOACAO_PRODUTO];

  constructor(protected anuncioService: AnuncioService,
              private categoriaService: CategoriaService,
              private usuarioService: UsuarioService,
              injector: Injector) {
    super(anuncioService, injector);
  }

  afterCarregarRegistroExistente(): void{
    this.caracteristicas = this.arrayByJson(this.registro.caracteristicas);
  }

  categoriaComplete(event: any): void {
    this.categoriaService.completeByDescricao(event.query).subscribe(e => this.categorias = e);
  }

  instituicaoComplete(event: any): void {
    this.usuarioService.completeByInstituicaoAndNome(event.query).subscribe(e => this.instituicoes = e);
  }

  operacaoComplete(event: any): void {
    this.operacoesSugestions = SuggestionsUtils.filter(Operacao, event.query);
  }

  onUpload($event: any) {
    this.registro.imagens = [];
    $event.files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.registro.imagens.push({url: (reader?.result as string)});
        }
        reader.readAsDataURL(file)
      }
    })
  }

  arrayByJson(json: JSON): Array<KeyValue<string, string>> {
    let array = new Array<KeyValue<string, string>>()
    for (const value in json) {
      array.push({key: value, value: json[value]});
    }
    return array;
  }

  jsonByArray(arr: Array<KeyValue<string, string>>): JSON {
    let jsonObject = {};
    arr.forEach((value) => {
      jsonObject[value.key] = value.value
    });
    return JSON.parse(JSON.stringify(jsonObject));
  }

  beforeSave() {
    this.registro.caracteristicas = this.jsonByArray(this.caracteristicas);
    this.registro.operacao = (<Operacao>this.registro.operacao);
  }

  isValidForm(): boolean {
    if (!this.registro.imagens?.length) {
      this.messageService.add({severity: 'warn', detail: "Deve-se carregar ao menos uma imagem."});
      return false;
    }
    return super.isValidForm();
  }

  showValor() {
    return this.operacoesHasValor.includes(this.registro?.operacao);
  }

  showDataDevolucao() {
    return Operacao.EMPRESTIMO === this.registro?.operacao;
  }

  showProdutosTroca() {
    return Operacao.TROCA === this.registro?.operacao;
  }

  showInstituicao() {
    return this.operacoesHasInstituicao.includes(this.registro.operacao);
  }
}

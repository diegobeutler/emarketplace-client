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
// @ts-ignore
import {ImagemAnuncio} from "../models/imagemAnuncio";
import * as $ from 'jquery';
import {errorTransform} from "../../../shared/pipes/error-transform";
import {Status} from "../enumeration/status";

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent extends SimpleCrudComponent<Anuncio> {
  caracteristicas: Array<KeyValue<string, string>>;
  categorias: Categoria[];
  operacoesSugestions: Operacao[];
  instituicoes: Usuario[];
  readonly operacoesHasValor = [Operacao.EMPRESTIMO, Operacao.DOACAO_VALOR, Operacao.VENDA];
  readonly operacoesHasInstituicao = [Operacao.DOACAO_VALOR, Operacao.DOACAO_PRODUTO];
  showDialog: boolean = false;
  emailInstituicao: any;
  readOnly = false;

  constructor(protected anuncioService: AnuncioService,
              private categoriaService: CategoriaService,
              private usuarioService: UsuarioService,
              injector: Injector) {
    super(anuncioService, injector);
  }

  afterCarregarRegistroExistente(): void {
    this.caracteristicas = this.arrayByJson(this.registro.caracteristicas);
    this.readOnly = this.registro.status !== Status.DISPONIVEL;
  }

  afterCriarNovoRegistro(): void {
    this.registro.imagens = [];
    this.caracteristicas = [];
    this.caracteristicas.push({key: '', value: ''});
    this.registro.status = Status.DISPONIVEL;
    this.resetValoresOperacoes();
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
    const files = $event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        const reader = new FileReader();
        reader.onload = () => {
          const nomeSemExtensao = files[i].name.slice(0, files[i].name.indexOf('.'));
          this.registro.imagens.push({id: undefined, url: (reader?.result as string), nome: nomeSemExtensao});
        }
        reader.readAsDataURL(files[i])
      }
    }
  }

  showUpfile(): void {
    $("#upfile").click();
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

  beforeSave(): void {
    this.registro.caracteristicas = this.jsonByArray(this.caracteristicas);
    this.registro.operacao = (<Operacao>this.registro.operacao);
  }

  isValidForm(): boolean {
    if (!this.registro.imagens?.length) {
      this.messageService.add({severity: 'warn', detail: "Deve-se selecionar ao menos uma imagem."});
      return false;
    }
    return super.isValidForm();
  }

  showValor(): boolean {
    return this.operacoesHasValor.includes(this.registro?.operacao);
  }

  showDataDevolucao(): boolean {
    return Operacao.EMPRESTIMO === this.registro?.operacao;
  }

  showProdutosTroca(): boolean {
    return Operacao.TROCA === this.registro?.operacao;
  }

  showInstituicao(): boolean {
    return this.operacoesHasInstituicao.includes(this.registro.operacao);
  }

  removerImage(imagemRemover: ImagemAnuncio): void {
    this.registro.imagens = this.registro.imagens.filter(imagem => imagem != imagemRemover);
  }

  resetValoresOperacoes() {
    this.registro.valor = 0;
    this.registro.dataDevolocao = null!;
    this.registro.produtosTroca = null!;
    this.registro.usuarioInstituicao = null!;
  }

  convidar() {
    this.loaderService.show(true, "Aguarde, enviando...");
    this.anuncioService.convidarInstituicao(this.emailInstituicao).subscribe(() => {
      this.loaderService.show(false);
      this.showDialog = false;
      this.messageService.add({severity: 'success', detail: "Convite enviado com sucesso!"});
    }, error => {
      this.loaderService.show(false);
      this.messageService.add({severity: 'error', detail: errorTransform(error)})
    });
  }

  ehFinalizado(): boolean {
    return this.registro.status == Status.FINALIZADO;
  }
}

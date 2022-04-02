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
  fileTeste: File;
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
    if(this.registro.imagens?.length){
      // this.uploadedFiles = this.registro.imagens.map((imagemAnuncio) => imagemAnuncio.url);
      // fetch(this.registro.imagens[0].url)
      //   .then(res => res.blob()) // Gets the response and returns it as a blob
      //   .then(blob => {
      //     // Here's where you get access to the blob
      //     // And you can use it for whatever you want
      //     // Like calling ref().put(blob)
      //     var reader = new FileReader();
      //     reader.readAsDataURL(blob);
      //
      //     // Here, I use it to make an image appear on the page
      //     // let objectURL = URL.createObjectURL(blob);
      //     // let myImage = new Image();
      //     // myImage.src = objectURL;
      //     // document.getElementById('myImg').appendChild(myImage)
      //   });
      // // fetch("https://URL/file")
      // //   .then((r)=>{r.text().then((d)=>{this.fileTeste = d})})
      // // this.anuncioService.getImageByUrl(this.registro.imagens[0].url).subscribe((file) =>{
      // //   this.fileTeste = file;
      // // })
    }
  }
  afterCriarNovoRegistro(): void{
    this.registro.imagens = [];
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

  removerImage(imagemRemover: ImagemAnuncio) {
    this.registro.imagens = this.registro.imagens.filter( imagem => imagem!=imagemRemover);
  }
}

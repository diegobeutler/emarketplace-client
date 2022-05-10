import {Component, Input, OnInit} from '@angular/core';
import {Anuncio} from "../../../models/anuncio";
import {Status} from "../../../enumeration/status";
import {AnuncioService} from "../../../anuncio.service";
import {LoginService} from "../../../../login/login.service";
import {KeyValue} from "@angular/common";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take} from "rxjs/operators";
import {LoaderService} from "../../../../../shared/components/loader/loader.service";
import {MessageService} from "primeng/api";
import {errorTransform} from "../../../../../shared/pipes/error-transform";
import {SuggestionsUtils} from "../../../../../shared/utils/suggestionsUtils";
import {Operacao} from "../../../enumeration/operacao";

@Component({
  selector: 'app-anuncio-card',
  templateUrl: './anuncio-card.component.html',
  styleUrls: ['./anuncio-card.component.scss']
})
export class AnuncioCardComponent implements OnInit {

  @Input()
  anuncio: Anuncio;

  isAuthenticated: boolean
  showDialogCaracteristicas: boolean;
  showDialogUsuario: boolean;
  caracteristicas: any;
  statusSugestions: any;

  constructor(private anuncioService: AnuncioService,
              private loginService: LoginService,
              private loaderService: LoaderService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.loginService.isAuthenticated;
    this.caracteristicas = this.arrayByJson(this.anuncio.caracteristicas);

    //todo necessário apenas para teste, serve para economizar as requisições
    // this.anuncio.imagens.forEach( img => img.url = 'https://www.viainox.com/media/catalog/product/cache/d6f4cb21568a4f522903293173e1d782/I/M/IMG_61771010_135389_0.jpg');
    // this.anuncio.imagens[0].url='https://brastemp.vtexassets.com/arquivos/ids/218811/Geladeira-Brastemp-BRO81AR-Frontal-1.jpg?v=637496169626900000';
    // this.anuncio.imagens[1].url='https://cdn.dooca.store/3683/products/78911161721862_1600x1600+fill_ffffff.jpg?v=1628108158';
  }

  getLabel(): string {
    switch (this.anuncio.status) {
      case Status.DISPONIVEL:
        return this.anuncio.operacao === Operacao.DOACAO_PRODUTO ? 'Aceitar Doação' : 'Tenho Interesse';
      case Status.EM_NEGOCIACAO:
        return 'Em Negociação'
      default:
        return 'Finalizado'
    }
  }

  updateStatusDisabled() {
    if (this.isAuthenticated) {
      switch (this.anuncio.status) {
        case Status.DISPONIVEL:
          return !(this.anuncio.operacao !== Operacao.DOACAO_PRODUTO || this.anuncio.ehUsuarioInstituicao);
        case Status.EM_NEGOCIACAO:
          return !(this.anuncio.ehUsuarioDestino || this.anuncio.operacao === Operacao.DOACAO_PRODUTO && this.anuncio.ehUsuarioInstituicao)
        default:
          return true
      }
    }
    return true
  }

  arrayByJson(json: JSON): Array<KeyValue<string, string>> {
    let array = new Array<KeyValue<string, string>>()
    for (const value in json) {
      array.push({key: value, value: json[value]});
    }
    return array;
  }

  showUpdateStatusDono(): boolean {
    return this.anuncio.ehUsuarioOrigem && this.anuncio.status == Status.EM_NEGOCIACAO;
  }

  getTooltip$(...values: any[]): Observable<string> {
    return of(values).pipe(
      debounceTime(200),
      map(value => {
        if (value[0]) {
          return value.join(" | ")
        }
        return "Selecione"
      }),
      distinctUntilChanged(),
      take(1)
    );
  }

  onClearStatus() {
    this.anuncio.status = Status.EM_NEGOCIACAO;
  }

  updateStatus() {
    this.anuncioService.updateStatus(this.anuncio).subscribe(e => {
      this.anuncio = e;
      if (e.ehUsuarioOrigem && e.operacao === Operacao.DOACAO_PRODUTO && e.status === Status.DISPONIVEL) {
        this.messageService.add({
          severity: 'warn',
          detail: "Status foi atualizado, porém deve-se alterar a instituição no anúncio"
        });
      }
    })
  }

  updateStatusUsuarioLogado() {
    this.anuncio.status = this.anuncio.status == Status.DISPONIVEL ? Status.EM_NEGOCIACAO : Status.DISPONIVEL;
    this.loaderService.show(true, "Aguarde, atualizando...")
    this.anuncioService.updateStatus(this.anuncio).subscribe(e => {
      this.anuncio = e;
      this.messageService.add({severity: 'success', detail: "Anúncio atualizado com sucesso!"});
      this.loaderService.show(false);
    }, error => {
      this.loaderService.show(false);
      this.messageService.add({severity: 'error', detail: errorTransform(error)});
    })
  }

  statusComplete(event: any) {
    let statusSugestionsFiltered = SuggestionsUtils.filter(Status, event.query);
    const index = statusSugestionsFiltered.findIndex(value => value == 'Em Negociação');
    if (index >= 0) {
      statusSugestionsFiltered.splice(index, 1);
    }
    this.statusSugestions = statusSugestionsFiltered;
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AnuncioFilter} from "./models/anuncioFilter";
import {AnuncioService} from "../../anuncio.service";
import {Anuncio} from "../../models/anuncio";
import {Cidade} from "../../../endereco/models/cidade";
import {Estado} from "../../../endereco/models/estado";
import {EstadoService} from "../../../endereco/estado.service";
import {CidadeService} from "../../../endereco/cidade.service";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take} from "rxjs/operators";
import {Categoria} from "../../../categoria/models/categoria";
import {Operacao} from "../../enumeration/operacao";
import {SuggestionsUtils} from "../../../../shared/utils/suggestionsUtils";
import {CategoriaService} from "../../../categoria/categoria.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filter: AnuncioFilter;
  showFilter: boolean;
  @Output()
  anuncios = new EventEmitter<Anuncio[]>();

  estados: Estado[];
  cidades: Cidade[];
  categorias: Categoria[];
  operacoesSugestions: Operacao[];

  constructor(private anuncioService: AnuncioService,
              private estadoService: EstadoService,
              private categoriaService: CategoriaService,
              private cidadeService: CidadeService) {
  }

  ngOnInit(): void {
    this.filter = new AnuncioFilter();
  }

  estadoComplete(event: any): void {
    this.estadoService.completeByNomeOrUf(event.query).subscribe(e => this.estados = e);
  }

  cidadeComplete(event: any): void {
    this.cidadeService.completeByEstadoAndNome(this.filter.estado?.id, event.query).subscribe(e => this.cidades = e);
  }

  categoriaComplete(event: any): void {
    this.categoriaService.completeByDescricao(event.query).subscribe(e => this.categorias = e);
  }

  operacaoComplete(event: any): void {
    this.operacoesSugestions = SuggestionsUtils.filter(Operacao, event.query);
  }


  clearEstado(): void {
    this.filter.estado = null!;
    this.filter.cidade = null!;
  }


  filtrar() {
    this.anuncioService.findAnunciosByFilter(this.filter)
      .subscribe( anuncios => this.anuncios.emit(anuncios));
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
}
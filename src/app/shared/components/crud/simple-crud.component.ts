import {Directive, Injectable, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CrudService} from "./crud.service";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {CrudComponent} from "./crud-component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export abstract class SimpleCrudComponent<T> implements CrudComponent<T>, OnInit {

  @ViewChild(NgForm, {static: false}) public form: NgForm;
  public registro: T;
  protected router: Router;
  protected activatedRoute: ActivatedRoute;
  protected location: Location;


  protected constructor(protected service: CrudService<T>,
                        protected injector: Injector) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
    this.novoRegistro();
  }

  loading: boolean;

  ngOnInit(): void {
    this.beforeOnInit();
    this.inicializar();
  }

  public inicializar() {
    this.activatedRoute.queryParams.subscribe(e => {
      if (e['id']) {
        this.carregar(e['id']);
      } else {
        this.novoRegistro();
        this.afterCriarNovoRegistro();
      }
    });
  }

  protected novoRegistro(): void {
    this.registro = {} as T;
  }

  public salvar(registro: T): void {
    if (this.validarForm()) {
      this.beforeSave();
      this.loading = true;
      this.service.salvar(registro).subscribe(e => {
        this.loading = false;
        // this.snackBar.open('O registro foi incluído com sucesso!', 'Ok');
        // this.novoRegistro();
        // this.afterCriarNovoRegistro();

        let url = this.router.url;
        if (!this.registro['id']) {
          this.registro = e;
          if (url.indexOf("/form") > -1) {
            this.location.go(url + "?id=" + this.registro['id']);
          }
        } else {
          this.registro = e;
        }
        this.afterSave();

      }, error => {
        console.log(error);
        this.loading = false;
        // this.snackBar.open(errorTransform(error) + '', 'Ok');
      });
    }
  }

  /**
   * @description Remove o registro do banco
   * @param registroId Id do registro a ser removido
   */
  public remover(registroId: number): void {
    this.loading = true;
    this.service.remover(registroId).subscribe(() => {
      this.loading = false;
      // this.snackBar.open('O registro foi excluído com sucesso!', 'Ok');
      this.novoRegistro();
      this.afterCriarNovoRegistro();
    }, error => {
      this.loading = false;
      // this.snackBar.open(errorTransform(error), 'Ok');
    });
  }

  validarForm(): boolean {
    return this.form.valid || this.form.status === 'DISABLED';
  }

  public carregar(id: number): void {
    // this.loading = true;
    this.service.carregar(id).subscribe(e => {
      // this.loading = false;
      if (e) {
        this.registro = e;
        this.afterCarregarRegistroExistente();

      } else {
        this.novoRegistro();
      }

      // this.form.reset(res);
    }, error => {
      // this.loading = false;
      // this.snackBar.open(errorTransform(error), 'Ok');
    });
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

  beforeOnInit(): void {
  }

  afterCarregarRegistroExistente(): void {
  }

  public afterCriarNovoRegistro(): void {
  }

  public beforeSave(): void {
  }

  public afterSave() {

  }
}

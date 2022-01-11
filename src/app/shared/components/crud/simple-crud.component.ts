import {Directive, Injectable, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CrudService} from "./crud.service";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CrudComponent} from "./crud-component";

@Injectable()
export abstract class SimpleCrudComponent<T> implements CrudComponent<T>, OnInit {

  @ViewChild(NgForm, {static: false}) public form: NgForm;
  public registro: T;
  protected route: ActivatedRoute;


  protected constructor(protected service: CrudService<T>,
                        protected injector: Injector) {
    this.novoRegistro();
  }

  loading: boolean;
  ngOnInit(): void {
    this.beforeOnInit();
    this.inicializar();
  }

  public inicializar() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // carrega o registro
      this.carregar(+id);
    } else {
      this.novoRegistro();
      this.resetForm();
    }
  }

  protected novoRegistro(): void {
      this.registro = {} as T;
  }

  public salvar(registro: T): void {
    if (this.validarForm()) {
      this.beforeSave();
      this.loading = true;
      this.service.salvar(registro).subscribe(() => {
        this.loading = false;
        // this.snackBar.open('O registro foi incluído com sucesso!', 'Ok');
        this.novoRegistro();
        this.resetForm();
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
      this.resetForm();
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
      debounceTime(250),
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

  public resetForm(): void {
  }

  public beforeSave(): void {
  }

}

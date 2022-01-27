import {Injectable, Injector, OnInit, ViewChild} from '@angular/core';
import {CrudService} from "./crud.service";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take} from "rxjs/operators";
import {FormControl, NgForm} from "@angular/forms";
import {CrudComponent} from "./crud-component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MessageService} from "primeng/api";
import {LoaderService} from "../loader/loader.service";
import {errorTransform} from "../../pipes/error-transform";

@Injectable()
export abstract class SimpleCrudComponent<T> implements CrudComponent<T>, OnInit {

  @ViewChild(NgForm, {static: false}) public form: NgForm;
  public registro: T;
  protected router: Router;
  protected activatedRoute: ActivatedRoute;
  protected location: Location;
  protected messageService: MessageService;
  protected loaderService: LoaderService


  protected constructor(protected service: CrudService<T>,
                        protected injector: Injector) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
    this.messageService = this.injector.get(MessageService);
    this.loaderService = this.injector.get(LoaderService)
    this.novoRegistro();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  public inicializar() {
    this.activatedRoute.queryParams.subscribe(e => {
      if (e['id']) {
        this.carregar(e['id']);
      } else {
        this.novoRegistro();
      }
    });
  }

  protected novoRegistro(): void {
    this.registro = {} as T;
    this.afterCriarNovoRegistro();
  }

  public salvar(registro: T): void {
    if (this.isValidForm()) {
      this.loaderService.show(true, 'Aguarde, salvando...');
      this.beforeSave();
      this.service.salvar(registro).subscribe(e => {
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
        this.loaderService.show(false);
        this.messageService.add({severity: 'success', detail: 'Registro salvo com sucesso!'});

      }, error => {
        this.loaderService.show(false);
        this.messageService.add({severity: 'error', detail: errorTransform(error)});
      });
    } else {
      if (this.form.status !== 'DISABLED') {
        for (const eachControl in this.form.controls) {
          (<FormControl>this.form.controls[eachControl]).markAsDirty();
          (<FormControl>this.form.controls[eachControl]).updateValueAndValidity();
        }
      }
    }
  }

  /**
   * @description Remove o registro do banco
   * @param registroId Id do registro a ser removido
   */
  public remover(registroId: number): void {
    this.loaderService.show(true, 'Aguarde, excluindo...');
    this.service.remover(registroId).subscribe(() => {
      this.novoRegistro();
      this.afterCriarNovoRegistro();
      this.loaderService.show(false);
      this.messageService.add({severity: 'success', detail: 'Registro excluído com sucesso!'});
    }, error => {
      this.loaderService.show(false);
      this.messageService.add({severity: 'error', detail: errorTransform(error)});
    });
  }

  isValidForm(): boolean {
    return this.form.valid || this.form.status === 'DISABLED';
  }

  public carregar(id: number): void {
    this.loaderService.show(true);
    this.service.carregar(id).subscribe(e => {
      if (e) {
        this.registro = e;
        this.afterCarregarRegistroExistente();
      } else {
        this.novoRegistro();
      }
      this.loaderService.show(false);
      // this.form.reset(res);
    }, error => {
      this.loaderService.show(false);
      this.messageService.add({severity: 'error', detail: errorTransform(error)});
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

  public afterCarregarRegistroExistente(): void {
  }

  public afterCriarNovoRegistro(): void {
  }

  public beforeSave(): void {
  }

  public afterSave() {

  }
}

import {Component, Injector, OnInit} from '@angular/core';
import {SimpleCrudComponent} from "../../shared/components/crud/simple-crud.component";
import {Anuncio} from "./models/anuncio";
import {AnuncioService} from "./anuncio.service";

@Component({
  selector: 'app-anuncio',
  template: `
    <app-anuncio-list [hidden]="!hiddenForm"></app-anuncio-list>
    <app-anuncio-form [hidden]="hiddenForm"></app-anuncio-form>`,
})
export class AnuncioComponent extends SimpleCrudComponent<Anuncio> implements OnInit {

  constructor(anuncioService: AnuncioService, injector: Injector) {
    super(anuncioService, injector);
  }

  ngOnInit(): void {
  }

}

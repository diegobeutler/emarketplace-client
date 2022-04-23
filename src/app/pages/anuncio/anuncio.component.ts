import {Component, Injector, OnInit} from '@angular/core';
import {SimpleCrudComponent} from "../../shared/components/crud/simple-crud.component";
import {Anuncio} from "./models/anuncio";
import {AnuncioService} from "./anuncio.service";

@Component({
  selector: 'app-anuncio',
  template: `
    <app-anuncio-form></app-anuncio-form>`,
})
export class AnuncioComponent extends SimpleCrudComponent<Anuncio> implements OnInit {

  constructor(anuncioService: AnuncioService, injector: Injector) {
    super(anuncioService, injector);
  }

  ngOnInit(): void {
  }

}

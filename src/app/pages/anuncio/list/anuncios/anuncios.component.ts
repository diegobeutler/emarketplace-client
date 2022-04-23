import {Component, Input, OnInit} from '@angular/core';
import {Anuncio} from "../../models/anuncio";

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  @Input()
  anuncios: Anuncio[];
  rows: any[];

  constructor() {
  }

  ngOnInit(): void {
  }

}

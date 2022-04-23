import {Component, Input, OnInit} from '@angular/core';
import {Anuncio} from "../../../models/anuncio";

@Component({
  selector: 'app-anuncio-card',
  templateUrl: './anuncio-card.component.html',
  styleUrls: ['./anuncio-card.component.scss']
})
export class AnuncioCardComponent implements OnInit {

  @Input()
  private anuncio: Anuncio;

  constructor() { }

  ngOnInit(): void {
  }

}

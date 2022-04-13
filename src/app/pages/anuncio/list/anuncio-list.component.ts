import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Anuncio} from "../models/anuncio";

@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss']
})
export class AnuncioListComponent implements OnInit {

  anuncios: Anuncio[];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // alert('teste')
    // this.activatedRoute.queryParamMap.subscribe(paramMap => {
    //   if (paramMap.has('showLoginSucess')) {
    //     this.messageService.add({severity: 'success', detail: 'Usuário autenticado com sucesso!'});
    //   }
    //   });
  }

  setAnuncios(anuncios: Anuncio[]) {
    this.anuncios = anuncios;
  }
}

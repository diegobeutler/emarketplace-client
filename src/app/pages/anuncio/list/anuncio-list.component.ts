import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss']
})
export class AnuncioListComponent implements OnInit {

  constructor(private messageService: MessageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(paramMap => {
      if (paramMap.has('showLoginSucess')) {
        this.messageService.add({severity: 'success', detail: 'Usuário autenticado com sucesso!'});
      }
      });
  }

}

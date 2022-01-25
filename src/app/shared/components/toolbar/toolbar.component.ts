import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {LoginService} from "../../../pages/login/login.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  //
  id  =14;
  items: MenuItem[];

  ngOnInit() {


    this.items = [
      {
        label:'Login',
        icon:'pi pi-fw pi-sign-in',
        url: '/login'
      },
      {
        label:'Usuário',
        icon:'pi pi-fw pi-user',
        items:[
          {
            label:'Cadastrar-se',
            icon:'pi pi-fw pi-user-plus',
            url: ' /usuario/form'
          },
          {
            label:'Perfil',
            icon:'pi pi-fw pi-user-edit',
            url: ' /usuario/form?id=14'

          }
        ]
      },
      {
        label:'Anúncios',
        items:[
          {
            label:'Anunciar',
            icon:'pi pi-fw pi-volume-up',
            url: ''

          },
          {
            label:'Comprar',
            icon:'pi pi-fw pi-shopping-cart',
            items:[
              {
                label:'Filter',
                icon:'pi pi-fw pi-filter',
                items:[
                  {
                    label:'Print',
                    icon:'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon:'pi pi-fw pi-bars',
                label:'List'
              }
            ]
          }
        ]
      },
      // {
      //   label:'Events',
      //   icon:'pi pi-fw pi-calendar',
      //   items:[
      //     {
      //       label:'Edit',
      //       icon:'pi pi-fw pi-pencil',
      //       items:[
      //         {
      //           label:'Save',
      //           icon:'pi pi-fw pi-calendar-plus'
      //         },
      //         {
      //           label:'Delete',
      //           icon:'pi pi-fw pi-calendar-minus'
      //         },
      //
      //       ]
      //     },
      //     {
      //       label:'Archieve',
      //       icon:'pi pi-fw pi-calendar-times',
      //       items:[
      //         {
      //           label:'Remove',
      //           icon:'pi pi-fw pi-calendar-minus'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   label:'Sair',
      //   icon:'pi pi-fw pi-sign-out',
      //   url:'/logout'
      // }
    ];
  }

  logout(): void {
    this.loginService.logout();
  }
}

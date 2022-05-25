import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {LoginService} from "../../../pages/login/login.service";
import {UsuarioService} from "../../../pages/usuario/usuario.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginService: LoginService,
              private usuarioService: UsuarioService) {
  }

  items: MenuItem[];

  ngOnInit() {

    // this.toolbarService.changeItemsToolbarSubject();
    this.usuarioService.logado().subscribe(e => {// todo melhorar

      this.items = [
        {
          label: 'Login',
          icon: 'pi pi-fw pi-sign-in',
          url: '/login'
        },
        {
          label: 'Usuário',
          icon: 'pi pi-fw pi-user',
          items: []
        },
        {
          label: 'Anúncios',
          items: [
            {
              label: 'Novo',
              icon: 'pi pi-fw pi-volume-up',
              url: 'anuncio/form'

            },
            {
              label: 'Listagem',
              icon: 'pi pi-fw pi-shopping-cart',
              url: 'home'
            }
          ]
        },
      ];

      if (e) {
        // @ts-ignore
        this.items[1].items.push({
          label: 'Perfil',
          icon: 'pi pi-fw pi-user-edit',
          url: ' /usuario/form?id=' + e.id

        });
      } else {
        // @ts-ignore
        this.items[1].items.push({
          label: 'Cadastrar-se',
          icon: 'pi pi-fw pi-user-plus',
          url: ' /usuario/form'
        })
      }
    }, error => {
      if (error.status == 401) {
        this.logout()
      }
    });

  }

  logout(): void {
    this.loginService.logout();
  }
}

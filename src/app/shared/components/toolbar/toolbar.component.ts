import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {LoginService} from "../../../pages/login/login.service";
import {UsuarioService} from "../../../pages/usuario/usuario.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginService: LoginService, private usuarioService: UsuarioService, private messageService: MessageService) {
  }

  //
  id = 14;
  items: MenuItem[];
  item: MenuItem;
  usuarioLogado;

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
              label: 'Anunciar',
              icon: 'pi pi-fw pi-volume-up',
              url: 'anuncio/form'

            },
            {
              label: 'Comprar',
              icon: 'pi pi-fw pi-shopping-cart',
              url:'home'
            }
          ]
        },
      ];


      this.usuarioLogado = e;
      if (e) {
        // const index = this.items.findIndex(i => i.label=='Usuário')
        // @ts-ignore
        this.items[1].items.push({
          label: 'Perfil',
          icon: 'pi pi-fw pi-user-edit',
          url: ' /usuario/form?id=' + e.id

        });
        console.log(this.items)
      } else {
        // @ts-ignore
        this.items[1].items.push({
          label: 'Cadastrar-se',
          icon: 'pi pi-fw pi-user-plus',
          url: ' /usuario/form'
        })
      }

    });

  }

  logout(): void {
    this.loginService.logout();
  }
}

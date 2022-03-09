import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from "./pages/usuario/reset-password/reset-password.component";
import {UpdatePasswordComponent} from "./pages/usuario/update-password/update-password.component";
import {AnuncioComponent} from "./pages/anuncio/anuncio.component";
import {AnuncioFormComponent} from "./pages/anuncio/form/anuncio-form.component";
import {AnuncioListComponent} from "./pages/anuncio/list/anuncio-list.component";

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule)},
  {path: 'usuario/form', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule)},
  {path: '',loadChildren: () => import('./pages/anuncio/anuncio.module').then(mod => mod.AnuncioModule)},
  {path: 'anuncio/form', component: AnuncioFormComponent},// rever
  {path: 'anuncio/list', component: AnuncioListComponent},// rever
  // {path: '', component: AnuncioComponent},
  {path: 'usuario/resetPassWord', component: ResetPasswordComponent},
  {path: 'usuario/changePassword', component: UpdatePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from "./pages/usuario/reset-password/reset-password.component";
import {UpdatePasswordComponent} from "./pages/usuario/update-password/update-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule) },
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule)},
  {path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule)},
  {path: 'usuario/form', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule)},
  {path: 'usuario/resetPassWord', component: ResetPasswordComponent},
  {path: 'usuario/changePassword', component: UpdatePasswordComponent},
  {path: '', loadChildren: () => import('./pages/anuncio/anuncio.module').then(mod => mod.AnuncioModule)},
  {path: 'anuncio/form',  loadChildren: () => import('./pages/anuncio/anuncio.module').then(mod => mod.AnuncioModule)},// rever
  // {path: 'anuncio/form', component: AnuncioFormComponent},// rever
  // {path: 'anuncio/list', component: AnuncioListComponent},// rever
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

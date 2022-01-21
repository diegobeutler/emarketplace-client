import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule)},
  { path: 'usuario/form', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule)},
  { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

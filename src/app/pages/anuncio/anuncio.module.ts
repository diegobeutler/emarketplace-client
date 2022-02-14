import {AnuncioComponent} from "./anuncio.component";
import {RouterModule, Routes} from "@angular/router";
import {AnuncioFormComponent} from "./form/anuncio-form.component";
import {AnuncioListComponent} from "./list/anuncio-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AnuncioService} from "./anuncio.service";
import {TokenInterceptor} from "../../shared/interceptors/token-interceptor.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";


const routes: Routes = [
  { path: '', component: AnuncioComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AnuncioFormComponent,
    AnuncioListComponent,
  ],
  providers: [
    AnuncioService,
    TokenInterceptor,

    // interceptors
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
  ],
})
export class AnuncioModule { }

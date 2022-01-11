import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {UsuarioFormComponent} from './pages/usuario/usuario-form.component';
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

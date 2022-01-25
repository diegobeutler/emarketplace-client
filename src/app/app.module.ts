import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TokenInterceptor} from "./shared/interceptors/token-interceptor.interceptor";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule

  ],
  providers: [
    TokenInterceptor,
    // interceptors
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

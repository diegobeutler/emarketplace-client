import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TokenInterceptor} from "./shared/interceptors/token-interceptor.interceptor";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {LoaderService} from "./shared/components/loader/loader.service";
import {LoaderModule} from "./shared/components/loader/loader.module";
import {FormsModule} from "@angular/forms";
import {NgxCurrencyModule} from "ngx-currency";
import {customCurrencyMaskConfig} from "./shared/config/currency.mask.config";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

// @ts-ignore
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
    ButtonModule,
    ToastModule,
    LoaderModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    MessageService,
    TokenInterceptor,
    // interceptors
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    LoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

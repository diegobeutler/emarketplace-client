import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'E-Marketplace';
  lang: string = 'pt';

  password: string = '';

  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    public primeNGConfig: PrimeNGConfig
  ) {
    translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);

    this.subscription = this.translate.stream('primeng').subscribe(data => {
      this.primeNGConfig.setTranslation(data);
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

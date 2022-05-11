import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe, registerLocaleData} from "@angular/common";
import pt from '@angular/common/locales/pt';

@Pipe({
  name: 'moneyFormat',
})
export class MoneyFormatPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  transform(value: number,
            format: string = '1.2-2'): any {
    if (value != null) {
      registerLocaleData(pt, 'pt-BR');
      const currencyPipe = new CurrencyPipe('pt-BR');
      return currencyPipe.transform(value, 'BRL', 'symbol', format);
    }
  }

}

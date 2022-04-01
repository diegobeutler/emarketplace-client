import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from "@angular/common";


@Pipe({
  name: 'moneyFormat',
})
export class MoneyFormatPipe implements PipeTransform {

  constructor() {}

  transform(value: number,
            format: string = '1.2-2'): any {
    if (value != null) {
      const currencyPipe = new CurrencyPipe('pt-BR');
      return currencyPipe.transform(value, 'BRL', 'symbol', format);
    }
  }

}

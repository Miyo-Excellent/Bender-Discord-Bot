import { CurrencyBuilder } from '@builders/currency.builder';
import { CurrenciesSymbolsInterface } from '@interfaces/currenciesSymbols.interface';

export interface ExchangeRateServiceInterface {
  getCurrencies(): Promise<CurrencyBuilder[]>;

  compareCurrencies(from: string, to: string): Promise<number>;

  getSymbols(): Promise<CurrenciesSymbolsInterface[]>;
}

import { AxiosInstance } from 'axios';
import { CurrenciesSymbolsInterface } from "@interfaces/currenciesSymbols.interface";
import { CurrencyBuilder } from '@builders/currency.builder';

export interface ExchangeRateRepositoryInterface {
  basePath: string;
  apiKey: string;
  client: AxiosInstance;

  getCurrencies(base: string, symbols: string[]): Promise<CurrencyBuilder[]>;
  getSymbols(): Promise<CurrenciesSymbolsInterface[]>;
}

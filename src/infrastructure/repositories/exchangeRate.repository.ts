import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ExchangeRateRepositoryInterface } from '@interfaces/exchangeRate.repository.interface';
import { CurrencyBuilder } from '@builders/currency.builder';
import { CurrenciesSymbolsInterface } from '@interfaces/currenciesSymbols.interface';

export class ExchangeRateRepository implements ExchangeRateRepositoryInterface {
  client: AxiosInstance;

  constructor(public basePath: string, public apiKey: string) {
    this.client = axios.create({ baseURL: this.basePath });

    this.client.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      request.headers.set('apiKey', this.apiKey);
      return request;
    });
  }

  getSymbols = async (): Promise<CurrenciesSymbolsInterface[]> => {
    const currenciesSymbols: CurrenciesSymbolsInterface[] = [];

    const response = await this.client.get('/symbols');
    const { data } = response;
    const symbols: [string, string][] = Object.entries<string>(data.symbols);

    for (const symbol of symbols) {
      const [code, name] = symbol;

      const currencySymbol: CurrenciesSymbolsInterface = { code, name };

      currenciesSymbols.push(currencySymbol);
    }

    return currenciesSymbols;
  };

  getCurrencies = async (base: string = 'USD', symbols: string[] = ['COP', 'CLP', 'USD', 'EUR']): Promise<CurrencyBuilder[]> => {
    const currencies: CurrencyBuilder[] = [];
    const response = await this.client.get('/latest', {
      params: { base, symbols: [...symbols].join(',') },
    });
    const { data } = response;

    for (const currencyRow of Object.entries(data.rates)) {
      const [code, rate] = currencyRow;

      const currency: CurrencyBuilder = new CurrencyBuilder({
        base,
        code,
        rate: Number(rate),
      });

      currencies.push(currency);
    }

    return currencies;
  };
}

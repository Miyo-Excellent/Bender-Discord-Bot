import { CurrencyBuilder } from '@builders/currency.builder';
import { ExchangeRateServiceInterface } from '@interfaces/exchangeRate.service.interface';
import { ExchangeRateRepository } from '@repositories/exchangeRate.repository';
import { getPackage } from '@di/injector';
import { CurrenciesSymbolsInterface } from '@interfaces/currenciesSymbols.interface';

export class ExchangeRateService implements ExchangeRateServiceInterface {
  private repository: ExchangeRateRepository = getPackage<ExchangeRateRepository>('exchangeRateRepository');

  getCurrencies = async (): Promise<CurrencyBuilder[]> => this.repository.getCurrencies();

  compareCurrencies = async (from: string, to: string): Promise<number> => {
    const currencies: CurrencyBuilder[] = await this.repository.getCurrencies();
    const fromCurrency: CurrencyBuilder | undefined = currencies.find((currency) => currency.code === from);
    const toCurrency: CurrencyBuilder | undefined = currencies.find((currency) => currency.code === to);

    if (!fromCurrency || !toCurrency) throw new Error(`Invalid currency code (from: ${fromCurrency}) or (to: ${to}`);

    return toCurrency.compare(fromCurrency);
  };

  getSymbols = async (): Promise<CurrenciesSymbolsInterface[]> => this.repository.getSymbols();
}

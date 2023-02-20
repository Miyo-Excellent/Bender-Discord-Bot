import { Currency } from '@schemas/currency.schema';
import { CurrencyInterface } from '@interfaces/currency.interface';

export class CurrencyBuilder implements Currency, CurrencyInterface {
    base: string;
    code: string;
    rate: number;

    constructor(options: Currency) {
        this.code = options.code;
        this.rate = options.rate;
        this.base = options.base;
    }

    compare = async (currency: Currency): Promise<number> => this.rate / currency.rate;
}
export interface CurrencyInterface {
  base: string;
  code: string;
  rate: number;

  compare(currency: CurrencyInterface): Promise<number>;
}

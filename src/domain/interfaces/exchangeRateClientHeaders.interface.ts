import { AxiosRequestHeaders } from 'axios';

export interface ExchangeRateClientHeadersInterface extends AxiosRequestHeaders {
  apikey: string;
}
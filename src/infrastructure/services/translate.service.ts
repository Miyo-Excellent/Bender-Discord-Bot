import { TranslateServiceInterface } from '@interfaces/translate.service.interface';
import { getPackage } from '@di/injector';
import { TranslateRepository } from '@repositories/translate.repository';
import i18next, { TOptionsBase } from 'i18next';

export class TranslateService implements TranslateServiceInterface {
  private repository: TranslateRepository = getPackage<TranslateRepository>('translateRepository');
  init = this.repository.init;

  parse = (input: string, options: TOptionsBase = {}): any | undefined => {
    const value: string = i18next.t(input, options);
    return value;
  };
}

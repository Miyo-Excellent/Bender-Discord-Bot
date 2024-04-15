import { join } from 'path';
import { asClass, asFunction, AwilixContainer, createContainer } from 'awilix';
import { Environment } from 'domain/environment';
import { OpenAiService } from '@services/openAi.service';
import { ExchangeRateService } from '@services/exchangeRate.service';
import { ExchangeRateRepository } from '@repositories/exchangeRate.repository';
import { OpenAiRepository } from '@repositories/openAi.repository';
import { TranslateRepository } from '@repositories/translate.repository';
import { TranslateService } from '@services/translate.service';
import { GeminiAiRepository } from '@repositories/geminiAi.repository';
import { GeminiAiService } from '@services/geminiAi.service';

export const container: AwilixContainer = createContainer();

export const getPackage = <T>(name: string): T => {
  const lib: T | undefined = container.resolve<T>(name);

  if (!lib) throw new Error('Invalid package name');

  return lib;
};

container.register({
  /// ENVIRONMENT
  environment: asClass(Environment).singleton(),
  /// REPOSITORIES
  openAiRepository: asFunction((_context) => {
    const environment: Environment = getPackage<Environment>('environment');
    return new OpenAiRepository(environment.openAiApiKey);
  }).singleton(),
  geminiAiRepository: asFunction((_context) => {
    const environment: Environment = getPackage<Environment>('environment');
    return new GeminiAiRepository(environment.geminiAiApiKey);
  }).singleton(),
  exchangeRateRepository: asFunction((_context) => {
    const environment: Environment = getPackage<Environment>('environment');
    return new ExchangeRateRepository(environment.exchangeRateBaseUrl, environment.apiLayerExchangeRateApiKey);
  }).singleton(),
  translateRepository: asFunction((_context) => {
    const environment: Environment = getPackage<Environment>('environment');
    return new TranslateRepository({
      language: environment.defaultLanguage,
      dirPath: join(__dirname, '..', 'i18n', 'translations'),
    });
  }).singleton(),
  /// SERVICES
  openAiService: asClass(OpenAiService).singleton(),
  geminiAiService: asClass(GeminiAiService).singleton(),
  translateService: asClass(TranslateService).singleton(),
  exchangeRateService: asClass(ExchangeRateService).singleton(),
});

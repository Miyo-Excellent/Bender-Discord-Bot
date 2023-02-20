export interface TranslateServiceInterface {
  parse: (input: string) => string | undefined;

  init(): Promise<void>;
}

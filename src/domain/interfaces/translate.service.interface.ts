export interface TranslateServiceInterface {
  parse: (input: string) => any | undefined;

  init(): Promise<void>;
}

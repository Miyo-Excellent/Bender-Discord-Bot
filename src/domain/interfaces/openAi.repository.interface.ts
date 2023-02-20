import { AxiosRequestConfig } from 'axios';
import { Configuration, CreateCompletionRequest, CreateCompletionResponseChoicesInner, OpenAIApi } from 'openai';

export interface OpenAiRepositoryInterface {
  configuration: Configuration;
  client: OpenAIApi;

  autocompletionText(prompt: string, stop: string[]): Promise<CreateCompletionResponseChoicesInner[]>;

  parseResponse(response: AxiosRequestConfig<CreateCompletionRequest>): Promise<CreateCompletionResponseChoicesInner[]>;
}
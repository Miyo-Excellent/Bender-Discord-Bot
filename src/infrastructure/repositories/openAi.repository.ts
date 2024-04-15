import { AxiosRequestConfig } from 'axios';
import { Configuration, CreateCompletionRequest, CreateCompletionResponse, CreateCompletionResponseChoicesInner, OpenAIApi } from 'openai';
import { OpenAiRepositoryInterface } from '@interfaces/openAi.repository.interface';

export class OpenAiRepository implements OpenAiRepositoryInterface {
  public configuration: Configuration;
  public client: OpenAIApi;

  constructor(protected apiKey: string) {
    this.configuration = new Configuration({ apiKey: this.apiKey });

    this.client = new OpenAIApi(this.configuration);
  }

  autocompletionText = async (prompt: string, stop: string[] = []): Promise<CreateCompletionResponseChoicesInner[]> => {
    const options: CreateCompletionRequest = {
      prompt,
      model: 'gpt-3.5-turbo',
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop,
    };

    const response: AxiosRequestConfig<CreateCompletionRequest> = await this.client.createCompletion(options);

    return this.parseResponse(response);
  };

  parseResponse = async (response: AxiosRequestConfig<CreateCompletionRequest>): Promise<CreateCompletionResponseChoicesInner[]> => {
    const choices: CreateCompletionResponseChoicesInner[] = (response.data as CreateCompletionResponse).choices.filter((choice) => !!choice.text);

    return choices;
  };
}

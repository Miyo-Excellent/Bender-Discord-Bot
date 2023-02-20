import { OpenAiServiceAskQuestionOptionInterface } from '@interfaces/openAiServiceAskQuestionOption.interface';

export interface OpenAiServiceInterface {
  askQuestion(options: OpenAiServiceAskQuestionOptionInterface): Promise<string>;
}

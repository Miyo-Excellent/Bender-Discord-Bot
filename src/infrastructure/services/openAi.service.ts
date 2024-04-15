import { OpenAiServiceInterface } from '@interfaces/openAi.service.interface';
import { OpenAiServiceAskQuestionOptionInterface } from '@interfaces/openAiServiceAskQuestionOption.interface';
import { CreateCompletionResponseChoicesInner } from 'openai';
import { OpenAiRepository } from '@repositories/openAi.repository';
import { getPackage } from '@di/injector';

export class OpenAiService implements OpenAiServiceInterface {
  private repository: OpenAiRepository = getPackage<OpenAiRepository>('openAiRepository');

  public askQuestion = async (options: OpenAiServiceAskQuestionOptionInterface = { value: '' }): Promise<string> => {
    const choices: CreateCompletionResponseChoicesInner[] = await this.repository.autocompletionText(options.value, options.keywords);

    let output: string = '';

    for (const choice of choices) output += `\n${(choice.text ?? '').trim()}`;

    return output.trim();
  };
}

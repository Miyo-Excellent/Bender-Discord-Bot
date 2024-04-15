import { OpenAiServiceInterface } from '@interfaces/openAi.service.interface';
import { OpenAiServiceAskQuestionOptionInterface } from '@interfaces/openAiServiceAskQuestionOption.interface';
import { getPackage } from '@di/injector';
import { GeminiAiRepository } from '@repositories/geminiAi.repository';
import { GenerateContentResult } from '@google/generative-ai';

export class OpenAiService implements OpenAiServiceInterface {
  // private repository: OpenAiRepository = getPackage<OpenAiRepository>('openAiRepository');
  private repository: GeminiAiRepository = getPackage<GeminiAiRepository>('geminiAiRepository');

  public askQuestion = async (options: OpenAiServiceAskQuestionOptionInterface = { value: '' }): Promise<string> => {
    const contentResult: GenerateContentResult = await this.repository.generateContent(options.value);

    if (Array.isArray(contentResult?.response?.candidates) && !!contentResult?.response?.candidates.length) {
      if (Array.isArray(contentResult?.response?.candidates[0]?.content?.parts) && !!contentResult?.response?.candidates[0]?.content?.parts.length) {
        return contentResult?.response?.candidates[0]?.content?.parts.join('\n');
      }

      return '';
    }

    return '';
  };
}

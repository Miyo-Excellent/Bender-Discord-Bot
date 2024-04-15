import { getPackage } from '@di/injector';
import { GeminiAiRepository } from '@repositories/geminiAi.repository';
import { GenerateContentResult } from '@google/generative-ai';
import { GeminiAiServiceAskQuestionOptionInterface } from '@interfaces/geminiAiServiceAskQuestionOption.interface';
import { GeminiAiServiceInterface } from '@interfaces/geminiAi.service.interface';

export class GeminiAiService implements GeminiAiServiceInterface {
  private repository: GeminiAiRepository = getPackage<GeminiAiRepository>('geminiAiRepository');

  public askQuestion = async (options: GeminiAiServiceAskQuestionOptionInterface = { value: '' }): Promise<string> => {
    try {
      const contentResult: GenerateContentResult = await this.repository.generateContent(options.value);
      debugger;
      return contentResult.response.text();
    } catch (error: any) {
      console.error(error);
      debugger;
      return error?.message ?? '';
    }
  };
}

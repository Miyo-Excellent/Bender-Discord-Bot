import { getPackage } from '@di/injector';
import { GeminiAiRepository } from '@repositories/geminiAi.repository';
import { GenerateContentCandidate, GenerateContentResult, Part } from '@google/generative-ai';
import { GeminiAiServiceAskQuestionOptionInterface } from '@interfaces/geminiAiServiceAskQuestionOption.interface';
import { GeminiAiServiceInterface } from '@interfaces/geminiAi.service.interface';

export class GeminiAiService implements GeminiAiServiceInterface {
  private repository: GeminiAiRepository = getPackage<GeminiAiRepository>('geminiAiRepository');

  public askQuestion = async (options: GeminiAiServiceAskQuestionOptionInterface = { value: '' }): Promise<string> => {
    const contentResult: GenerateContentResult = await this.repository.generateContent(options.value);
    const candidates: GenerateContentCandidate[] = contentResult?.response?.candidates ?? [];

    if (!!candidates.length) {
      const parts: Part[] = candidates.reduce<Part[]>((acc, { content }) => [...acc, ...content.parts], []);

      const texts: string[] = parts.map(({ text = '' }) => text);

      return texts.join('\n');
    }

    return '';
  };
}

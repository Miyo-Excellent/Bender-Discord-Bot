import { GenerateContentResult } from '@google/generative-ai';
import { GeminiAiServiceAskQuestionOptionInterface } from '@interfaces/geminiAiServiceAskQuestionOption.interface';

export interface GeminiAiServiceInterface {
  askQuestion(options: GeminiAiServiceAskQuestionOptionInterface): Promise<GenerateContentResult>;
}

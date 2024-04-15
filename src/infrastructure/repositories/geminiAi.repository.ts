import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiAiRepositoryInterface } from '@interfaces/geminiAi.repository.interface';

export class GeminiAiRepository implements GeminiAiRepositoryInterface {
  readonly generator: GoogleGenerativeAI;
  readonly model: GenerativeModel;

  constructor(protected apiKey: string) {
    this.generator = new GoogleGenerativeAI(apiKey);

    this.model = this.generator.getGenerativeModel({
      model: 'gemini-1.0-pro-latest',
    });
  }

  generateContent = async (prompt: string): Promise<GenerateContentResult> => {
    return this.model.generateContent(prompt);
  };
}

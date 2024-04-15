import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiAiRepositoryInterface {
  readonly generator: GoogleGenerativeAI;
  readonly model: GenerativeModel;

  generateContent(prompt: string): Promise<GenerateContentResult>;
}

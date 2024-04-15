import { object, string, z } from 'zod';

export const CommandBuilderOptionsSchema = object({
  description: string(),
  name: string(),
});

export type CommandBuilderOptions = z.infer<typeof CommandBuilderOptionsSchema>;

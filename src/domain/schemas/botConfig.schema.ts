import { z } from 'zod';
export const BotConfigSchema = z.object({
    prefix: z.string().default('!').optional(),
    token: z.string(),
});

export type BotConfig = z.infer<typeof BotConfigSchema>
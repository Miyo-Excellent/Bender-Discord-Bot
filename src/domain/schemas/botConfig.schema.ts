import { z } from 'zod';
export const BotConfigSchema = z.object({
    prefix: z.string().default('!').optional(),
    version: z.string().default('10').optional(),
    clientId: z.string(),
    guildId: z.string(),
    token: z.string(),
});

export type BotConfig = z.infer<typeof BotConfigSchema>
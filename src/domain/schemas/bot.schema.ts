import { array, object, string, z } from 'zod';
import { CommandSchema } from '@schemas/command.schema';
import { ClientSchema } from '@schemas/client.schema';

export const BotSchema = object({
  client: ClientSchema,
  commandsPath: string(),
  commands: array(CommandSchema),
});

export type Bot = z.infer<typeof BotSchema>;

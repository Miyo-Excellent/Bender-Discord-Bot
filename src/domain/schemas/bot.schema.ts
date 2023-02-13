import { array, object, string, z } from 'zod';
import { CommandSchema } from '@schemas/command.schema';
import { EventSchema } from '@schemas/event.schema';
import { ClientSchema } from '@schemas/client.schema';

export const BotSchema = object({
  client: ClientSchema,
  commandsPath: string(),
  eventsPath: string(),
  commands: array(CommandSchema),
  events: array(EventSchema),
});

export type Bot = z.infer<typeof BotSchema>;

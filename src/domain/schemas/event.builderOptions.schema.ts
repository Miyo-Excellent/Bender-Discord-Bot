import { Client } from 'discord.js';
import { array, object, z } from 'zod';
import { CommandSchema } from '@schemas/command.schema';

export const EventBuilderOptionsSchema = object({
  commands: array(CommandSchema),
  client: z.instanceof(Client),
});

export type EventBuilderOptions = z.infer<typeof EventBuilderOptionsSchema>;


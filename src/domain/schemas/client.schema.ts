import { z } from 'zod';
import * as discord from 'discord.js';

export const ClientSchema = z.instanceof(discord.Client);

export type Client = z.infer<typeof ClientSchema>;

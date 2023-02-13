import { z } from 'zod';
import { CommandBuilder } from '@builders/command.builder';

export const CommandSchema = z.instanceof(CommandBuilder);

export type Command = z.infer<typeof CommandSchema>;

import { CacheType, CommandInteractionOptionResolver } from 'discord.js';

export type ChatInputCommandInteractionOption = Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>;
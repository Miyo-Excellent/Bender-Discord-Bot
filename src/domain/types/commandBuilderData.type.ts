import { SlashCommandBuilder } from 'discord.js';

export type CommandBuilderDataType = Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

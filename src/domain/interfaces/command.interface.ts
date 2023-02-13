import { ChatInputApplicationCommandData, ChatInputCommandInteraction, Client } from 'discord.js';

export interface CommandInterface extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: ChatInputCommandInteraction) => void;
}

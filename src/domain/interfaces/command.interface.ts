import {ChatInputApplicationCommandData, Client, CommandInteraction} from 'discord.js';

export interface CommandInterface extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}

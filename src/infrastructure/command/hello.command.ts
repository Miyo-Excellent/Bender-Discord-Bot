import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import type { CommandInterface } from '../../domain/interfaces/command.interface';

export const helloCommand: CommandInterface = {
  name: 'hello',
  description: 'Returns a greeting',
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const content = 'Hey, Bitch!';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

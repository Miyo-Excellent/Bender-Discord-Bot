import {Client, CommandInteraction} from 'discord.js';
import type {CommandInterface} from '../../domain/interfaces/command.interface';

export default class HelloCommand implements CommandInterface {
    description: string = 'Returns a greeting';
    name: string = 'hello'

    async run(_client: Client, interaction: CommandInteraction): Promise<void> {
        const content = 'Hey, Bitch!';

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    }

}
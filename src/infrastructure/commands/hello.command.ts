import {Client, CommandInteraction} from 'discord.js';
import {CommandBuilder} from '../builders/command.builder';

export default class HelloCommand extends CommandBuilder {
    override description: string = 'Returns a greeting';
    override name: string = 'hello';

    override async run(_client: Client, interaction?: CommandInteraction): Promise<void> {
        const content = 'Hey, I\'m Bender 🤖!';

        await interaction?.followUp({
            ephemeral: true,
            content,
        });
    }
}
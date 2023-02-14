import {ChatInputCommandInteraction, Client} from 'discord.js';
import {CommandBuilder} from '@builders/command.builder';

export default class HelloCommand extends CommandBuilder {
    constructor() {
        super({
            name: 'hello',
            description: 'Returns a greeting',
        });
    }

    run = async (_client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
        const content = "Hey, I'm Bender 🤖🤖🤖🤖!";
        const json = interaction.toJSON();
        console.log(_client);
        console.log(json);
        await interaction.reply({
            ephemeral: true,
            content,
        });
    };
}
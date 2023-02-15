import {ChatInputCommandInteraction, Client, InteractionReplyOptions, MessagePayload} from 'discord.js';
import {CommandBuilder} from '@builders/command.builder';

export default class AskCommand extends CommandBuilder {
    constructor() {
        super({name: 'ask', description: 'Ask Bender Anything'});

        this.data.addStringOption((option) =>
            option.setName('text').setDescription('What do you want to ask me human?').setRequired(true).setAutocomplete(true),
        );
    }

    run = async (_client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
        const content: string = "Hey, I'm Bender 🤖!";
        const options: string | MessagePayload | InteractionReplyOptions = {ephemeral: true, content};
        await interaction.reply(options);
        await interaction.followUp({ephemeral: true, content: 'Hello again!'});
        console.log(interaction);
    };
}
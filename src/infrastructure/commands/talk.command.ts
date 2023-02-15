import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    Client,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js';
import {CommandBuilder} from '@builders/command.builder';

export default class TalkCommand extends CommandBuilder {
    constructor() {
        super({name: 'talk', description: 'Talk with Bender'});
    }

    run = async (_client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
        const talkInput: TextInputBuilder = new TextInputBuilder()
            .setCustomId('BENDER_TALK_MODAL_INPUT_ONE')
            .setLabel('You wanna tell me something?')
            .setStyle(TextInputStyle.Paragraph);

        const talkActionRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(talkInput);
        const modal: ModalBuilder = new ModalBuilder().setCustomId('TALK_MODAL').setTitle('Talk with me').addComponents(talkActionRow);

        await interaction.showModal(modal);
    };
}
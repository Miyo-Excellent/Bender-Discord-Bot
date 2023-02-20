import {
    ActionRowBuilder,
    BaseInteraction,
    ChatInputCommandInteraction,
    Client,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import { CommandBuilder } from '@builders/command.builder';
import { OpenAiService } from '@services/openAi.service';
import { container } from '@di/injector';
import { BenderBot } from '@bots/bender.bot';
import { TranslateService } from '@services/translate.service';

export default class TalkCommand extends CommandBuilder {
    protected translateService: TranslateService;
    private openAiService: OpenAiService = container.resolve<OpenAiService>('openAiService');

    constructor() {
        const translateService = container.resolve<TranslateService>('translateService');
        const name: string = translateService.parse('talk');
        const description: string = translateService.parse('benderTalkWithMe');
        super({ name, description });
        this.translateService = translateService;
    }

    run = async (_client: Client, interaction: BaseInteraction): Promise<void> => {
        const benderYouWannaTellMeSomething: string = this.translateService.parse('benderYouWannaTellMeSomething');
        const benderTalkWithMe: string = this.translateService.parse('benderTalkWithMe');
        const openAiContextChatWrapperStart: string = this.translateService.parse('openAiContextChatWrapperStart');
        const openAiContextChatWrapperEnd: string = this.translateService.parse('openAiContextChatWrapperEnd');

        if (interaction instanceof ChatInputCommandInteraction) {
            const talkInput: TextInputBuilder = new TextInputBuilder()
              .setCustomId('BENDER_TALK_MODAL_INPUT_ONE')
              .setLabel(benderYouWannaTellMeSomething)
              .setStyle(TextInputStyle.Paragraph);

            const talkActionRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(talkInput);
            const modal: ModalBuilder = new ModalBuilder()
              .setCustomId(`${this.name}_MODAL`.toUpperCase())
              .setTitle(benderTalkWithMe)
              .addComponents(talkActionRow);

            await interaction.showModal(modal);
        } else if (interaction instanceof ModalSubmitInteraction) {
            const [form] = interaction.components;
            const [inputOne] = form.components as any[];
            const value: string = `${openAiContextChatWrapperStart}${inputOne.value}${openAiContextChatWrapperEnd}`;

            if (inputOne.value) {
                const output: string = await this.openAiService.askQuestion({
                    value,
                    keywords: BenderBot.openAIChatContextWrapperKeywords,
                });

                await this.reply(interaction, `<@${interaction.user.id}>: ${inputOne.value}\n<@${interaction.client.user.id}>: ${output}`);
            }
        }
    };
}
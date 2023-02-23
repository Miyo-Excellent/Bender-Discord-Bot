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
        const language: string = interaction.locale.split('-')[0];

        const benderYouWannaTellMeSomething: string = this.translateService.parse('benderYouWannaTellMeSomething');
        const benderTalkWithMe: string = this.translateService.parse('benderTalkWithMe');
        const openAiContextChatWrapperStart: string = this.translateService.parse('openAiContextChatWrapperStart');
        const openAiContextChatWrapperEnd: string = this.translateService.parse('openAiContextChatWrapperEnd');
        const openAiContextChatKeywords: string[] = this.translateService.parse('openAiContextChatKeywords');
        const cacheEventCaching: string = this.translateService.parse('cacheEventCaching', { lng: language });
        const benderIsThinking: string = this.translateService.parse('benderIsThinking', { lng: language });
        const benderIsHangover: string = this.translateService.parse('benderIsHangover', { lng: language });

        const savedInCache: boolean = await this.isInteractionSavedOnCache(interaction);

        await this.reply(interaction, {
            content: benderIsThinking,
            ephemeral: true,
            fetchReply: true,
        });

        if (!savedInCache) {
            await this.reply(interaction, {
                content: cacheEventCaching,
                ephemeral: true,
                fetchReply: true,
            });
        }

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
                let reply: string = `<@${interaction.user.id}>: ${inputOne.value}\n<@${interaction.client.user.id}>: ${benderIsHangover}`;

                try {
                    const output: string = await this.openAiService.askQuestion({
                        value,
                        keywords: openAiContextChatKeywords,
                    });

                    reply = `<@${interaction.user.id}>: ${inputOne.value}\n<@${interaction.client.user.id}>: ${output}`;
                } catch (error) {
                    console.error('Unknown Error: ', error);
                }

                await this.reply(interaction, { content: reply, fetchReply: true });
            }
        }
    };
}
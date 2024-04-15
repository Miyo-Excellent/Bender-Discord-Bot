import { BaseInteraction, ChatInputCommandInteraction, Client } from 'discord.js';
import { CommandBuilder } from '@builders/command.builder';
import { container } from '@di/injector';
import { TranslateService } from '@services/translate.service';
import { GeminiAiService } from '@services/geminiAi.service';

export default class AskCommand extends CommandBuilder {
  protected translateService: TranslateService;
  protected geminiAiService: GeminiAiService;

  constructor() {
    const translateService = container.resolve<TranslateService>('translateService');
    const geminiAiService = container.resolve<GeminiAiService>('geminiAiService');

    const name: string = translateService.parse('ask');
    const description: string = translateService.parse('benderAskTitle');
    const benderAskLabel: string = translateService.parse('benderAskLabel');
    const text: string = translateService.parse('text');

    super({ name, description });

    this.translateService = translateService;
    this.geminiAiService = geminiAiService;

    this.data.addStringOption((option) => option.setName(text).setDescription(benderAskLabel).setRequired(true).setAutocomplete(true));
  }

  run = async (_client: Client, interaction: BaseInteraction): Promise<void> => {
    const language: string = interaction.locale.split('-')[0];
    const cacheEventCaching: string = this.translateService.parse('cacheEventCaching', { lng: language });
    const openAiContextChatWrapperStart: string = this.translateService.parse('openAiContextChatWrapperStart', { lng: language });
    const openAiContextChatWrapperEnd: string = this.translateService.parse('openAiContextChatWrapperEnd', { lng: language });
    const benderIsThinking: string = this.translateService.parse('benderIsThinking', { lng: language });
    const benderIsHangover: string = this.translateService.parse('benderIsHangover', { lng: language });

    if (interaction instanceof ChatInputCommandInteraction) {
      const [message] = interaction.options.data;

      const messageValue = message?.value ?? '';
      const value: string = `${openAiContextChatWrapperStart}${messageValue}${openAiContextChatWrapperEnd}`;

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

      let output: string = benderIsHangover;

      try {
        output = await this.geminiAiService.askQuestion({ value });
      } catch (error) {
        console.error('Unknown Error: ', error);
      }

      await this.reply(interaction, {
        content: `<@${interaction.user.id}>: ${messageValue}\n<@${interaction.client.user.id}>: ${output}`,
        fetchReply: true,
      });
    }

    return;
  };
}

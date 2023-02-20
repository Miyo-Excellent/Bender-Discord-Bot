import {
  ActionRowBuilder,
  APISelectMenuOption,
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  RestOrArray,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import { CommandBuilder } from '@builders/command.builder';
import { container } from '@di/injector';
import { ExchangeRateRepository } from '@repositories/exchangeRate.repository';
import { CurrencyBuilder } from '@builders/currency.builder';
import { TranslateService } from '@services/translate.service';

export default class AskCommand extends CommandBuilder {
  protected translateService: TranslateService;
  private exchangeRateRepository: ExchangeRateRepository = container.resolve<ExchangeRateRepository>('exchangeRateRepository');

  constructor() {
    const translateService = container.resolve<TranslateService>('translateService');
    const name: string = translateService.parse('currencies');
    const description: string = translateService.parse('swoAllCurrencyData');

    super({ name, description });

    this.translateService = translateService;
  }

  run = async (_client: Client, interaction: BaseInteraction): Promise<void> => {
    const benderAskCurrenciesWithoutSelection: string = this.translateService.parse('benderAskCurrenciesWithoutSelection');
    const simpleWordValue: string = this.translateService.parse('value');
    if (interaction instanceof ChatInputCommandInteraction) {
      const [message] = interaction.options.data;

      const value: string = `${message?.value ?? ''}`;

      const savedInCache: boolean = await this.isInteractionSavedOnCache(interaction);

      if (savedInCache) {
        const cacheEventCaching: string = this.translateService.parse('cacheEventCaching');

        await this.reply(interaction, {
          content: cacheEventCaching,
          ephemeral: true,
        });
      }

      let output: string = `<@${interaction.user.id}>: ${value}\n<@${interaction.client.user.id}>: `;

      try {
        const currencies: CurrencyBuilder[] = await this.exchangeRateRepository.getCurrencies();

        const options: RestOrArray<APISelectMenuOption | StringSelectMenuOptionBuilder> = currencies.map((currency: CurrencyBuilder) => ({
          label: currency.code,
          description: `${simpleWordValue}: ${currency.rate}`,
          value: currency.code.toLowerCase(),
        }));

        const selector: any = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('CURRENCY_SELECT')
            .setPlaceholder(benderAskCurrenciesWithoutSelection)
            .addOptions(...options),
        );

        await this.reply(interaction, { content: output, components: [selector] });
      } catch (error) {
        console.error(error);
      }
    }

    return;
  };
}

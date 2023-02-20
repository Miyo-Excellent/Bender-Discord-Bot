import { Client, GatewayIntentBits } from 'discord.js';
import path from 'path';
import { BotConfig } from '@schemas/botConfig.schema';
import { BotBuilder } from '@builders/bot.builder';
import { getPackage } from '@di/injector';
import { ExchangeRateService } from '@services/exchangeRate.service';
import { TranslateRepository } from '@repositories/translate.repository';

export const defaultOptions: BotConfig = { clientId: '', guildId: '', token: '' };

export class BenderBot extends BotBuilder {
  public static override openAIChatContextWrapperStart: string =
    'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ';
  public static override openAIChatContextWrapperKeywords: string[] = [' Human:', ' AI:'];
  public static override openAIChatContextWrapperEnd: string = '.\n\nAI:';
  public translateRepository: TranslateRepository = getPackage<TranslateRepository>('translateRepository');
  override commandsPath: string = path.join(__dirname, '../commands');
  // @ts-ignore
  private exchangeRateService: ExchangeRateService = getPackage<ExchangeRateService>('exchangeRateService');

  constructor(config: BotConfig = defaultOptions) {
    const client: Client<true> = new Client({
      allowedMentions: {
        parse: ['users', 'roles'],
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
      ],
    });

    super(client, config);
  }

  public override onClientReady = async (client: Client<true>): Promise<void> => {
    await this.translateRepository.init();

    const tag: string = `as ${client.user.tag}`;

    // const exchangeCurrenciesSymbols: CurrenciesSymbolsInterface[] = await this.exchangeRateService.getSymbols();

    console.log(
      '===================Ready Event===================\n',
      `Logged in ${tag}`,
      '-------------------------------------------------\n',
      // `${exchangeCurrenciesSymbols.length} coin symbols has been obtained`,
    );
  };
}

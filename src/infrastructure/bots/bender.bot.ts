import { Client, GatewayIntentBits } from 'discord.js';
import path from 'path';
import { BotConfig } from '@schemas/botConfig.schema';
import { BotBuilder } from '@builders/bot.builder';

export const defaultOptions: BotConfig = { clientId: '', guildId: '', token: '' };

export class BenderBot extends BotBuilder {
  override commandsPath: string = path.join(__dirname, '../commands');

  constructor(config: BotConfig = defaultOptions) {
    const client: Client<true> = new Client({
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
}

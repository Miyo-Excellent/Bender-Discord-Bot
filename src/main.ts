import {config as envConfig} from 'dotenv';
import {BenderBot} from '@bots/bender.bot';

envConfig();

const benderBot = new BenderBot({
  token: process.env.DISCORD_TOKEN || '',
  guildId: process.env.DISCORD_GUILD_ID || '',
  clientId: process.env.DISCORD_CLIENT_ID || '',
  version: process.env.DISCORD_CLIENT_VERSION || '',
  prefix: process.env.DISCORD_COMMAND_PREFIX || '',
});

(async () => {
  await benderBot.start();
})();

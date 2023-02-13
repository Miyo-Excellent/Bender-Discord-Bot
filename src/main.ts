import { config as envConfig } from 'dotenv';
import { BenderBot } from '@bots/bender.bot';

envConfig();

const benderBot = new BenderBot({
  token: process.env.DISCORD_TOKEN || '',
  guildId: process.env.DISCORD_GUILD_ID || '',
  clientId: process.env.DISCORD_CLIENT_ID || '',
});

(async () => {
  await benderBot.start();
})();

import { config as envConfig } from 'dotenv';
import { BenderBot } from './infrastructure/bots/bender.bot';

envConfig();

const benderBot = new BenderBot({
  token: process.env.DISCORD_TOKEN || '',
});

(async () => {
  await benderBot.start();
})();

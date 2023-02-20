import { config as envConfig } from 'dotenv';
import { BenderBot } from '@bots/bender.bot';
import { Environment } from 'domain/environment';
import { container } from '@di/injector';

envConfig();

const environment: Environment = container.resolve<Environment>('environment');

const benderBot = new BenderBot({
  token: environment.discordToken,
  guildId: environment.discordGuildId,
  clientId: environment.discordClientId,
  version: environment.discordClientVersion,
  prefix: environment.discordCommandPrefix,
});

(async () => {
  await benderBot.start();
})();

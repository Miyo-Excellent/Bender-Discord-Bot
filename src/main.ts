import {config as envConfig} from 'dotenv';
import {BenderBot} from '@bots/bender.bot';

envConfig();

const benderBot = new BenderBot({
  token: process.env.DISCORD_TOKEN || '',
  guildId: process.env.DISCORD_GUILD_ID || '',
  clientId: process.env.DISCORD_CLIENT_ID || '',
});

(async () => {
  await benderBot.start();
})();

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//
// client.once(Events.ClientReady, () => {
//   console.log('Ready!');
// });
//
// client.on(Events.InteractionCreate, async (interaction: Interaction) => {
//   if (interaction instanceof ChatInputCommandInteraction) {
//     const { commandName } = interaction;
//
//     await interaction.reply({
//       ephemeral: true,
//       content: `test of ${commandName}`,
//     });
//   }
// });
//
// client.login(process.env.DISCORD_TOKEN || '');

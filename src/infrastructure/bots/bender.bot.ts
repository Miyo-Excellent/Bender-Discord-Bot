import { Client, CommandInteraction, Events, Interaction } from 'discord.js';
import { BotConfig } from '../../domain/schemas/botConfig.schema';
import { CommandInterface } from '../../domain/interfaces/command.interface';
import { helloCommand } from '../command/hello.command';

export class BenderBot {
  commands: CommandInterface[] = [];

  private readonly client: Client;

  constructor(private config: BotConfig) {
    this.client = new Client({
      intents: [
        // IntentsBitField.Flags.AutoModerationConfiguration,
        // IntentsBitField.Flags.AutoModerationExecution,
        // IntentsBitField.Flags.DirectMessageReactions,
        // IntentsBitField.Flags.GuildBans,
        // IntentsBitField.Flags.DirectMessages,
        // IntentsBitField.Flags.DirectMessageTyping,
        // IntentsBitField.Flags.GuildEmojisAndStickers,
        // IntentsBitField.Flags.GuildIntegrations,
        // IntentsBitField.Flags.GuildInvites,
        // IntentsBitField.Flags.GuildMembers,
        // IntentsBitField.Flags.GuildMessageReactions,
        // IntentsBitField.Flags.GuildMessages,
        // IntentsBitField.Flags.GuildMessageTyping,
        // IntentsBitField.Flags.GuildModeration,
        // IntentsBitField.Flags.GuildPresences,
        // IntentsBitField.Flags.Guilds,
        // IntentsBitField.Flags.GuildScheduledEvents,
        // IntentsBitField.Flags.GuildVoiceStates,
        // IntentsBitField.Flags.GuildWebhooks,
        // IntentsBitField.Flags.MessageContent,
      ],
    });

    this.commands.push(helloCommand);
  }

  public async start(): Promise<void> {
    this.client.on('ready', async () => {
      await this.client?.application?.commands.set(this.commands);

      console.log(`🤖 Bender Bot 🤖 is now connected as ${this.client.user?.tag}.`);
    });

    this.client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await this.handleSlashCommand(interaction);
      }
    });

    // this.client.on(Events.MessageCreate, (message: Message) => {
    //   console.log(message);
    //
    //   if (!message.content.startsWith(this.config.prefix || '') || message.author.bot) return;
    //
    //   const [command, ...args]: string[] = message.content.slice((this.config.prefix || '').length).split(/\s+/);
    //
    //   const userMessage: string = args.join(' ');
    //
    //   switch (command) {
    //     case 'ping':
    //       message.channel.send('Pong!');
    //       break;
    //     case 'say':
    //       message.channel.send(userMessage);
    //       break;
    //     default:
    //       message.channel.send(`Unknown command: ${command}`);
    //       break;
    //   }
    // });

    await this.client.login(this.config.token);
  }

  private async handleSlashCommand(interaction: CommandInteraction): Promise<void> {
    const slashCommand = this.commands.find((command) => command.name === interaction.commandName);

    if (!slashCommand) {
      await interaction.followUp({ content: 'An error has occurred' });
      return;
    }

    await interaction.deferReply();

    slashCommand.run(this.client, interaction);
  }
}

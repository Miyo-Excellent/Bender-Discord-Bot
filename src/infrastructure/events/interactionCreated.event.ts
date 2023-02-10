import { CommandInteraction, Events, Interaction } from 'discord.js';
import { EventBuilder, EventBuilderOptions } from '../builders/event.builder';

export interface BenderInteractionCreatedEventOptions extends EventBuilderOptions {}

export default class InteractionCreatedEvent extends EventBuilder {
  override event: Events = Events.InteractionCreate;

  constructor(options: BenderInteractionCreatedEventOptions) {
    super(options);
  }

  async run(): Promise<void> {
    this.client.on(this.event as string, async (interaction: Interaction) => {
      if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await this.handleSlashCommand(interaction);
      }
    });
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

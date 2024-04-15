import {
  BaseInteraction,
  Channel,
  ChatInputCommandInteraction,
  Client,
  DMChannel,
  InteractionReplyOptions,
  MessagePayload,
  ModalSubmitInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from 'discord.js';
import { CommandBuilderOptions } from '@schemas/command.builderOptions.schema';
import { CommandBuilderDataType } from '@t/commandBuilderData.type';
import { Command } from '@schemas/command.schema';
import { CommandInterface } from '@interfaces/command.interface';

export class CommandBuilder implements Command, CommandInterface {
  public data: CommandBuilderDataType;
  public description: string;
  public name: string;

  constructor(options: CommandBuilderOptions) {
    this.description = options.description;
    this.name = options.name;

    this.data = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
  }

  get json(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return this.data.toJSON();
  }

  reply = async (interaction: BaseInteraction, options: string | MessagePayload | InteractionReplyOptions): Promise<void> => {
    try {
      if (interaction instanceof ModalSubmitInteraction) {
        if (interaction.isRepliable()) {
          if (interaction.replied) await interaction.followUp(options);
          else await interaction.reply(options);
        }
      } else if (interaction instanceof ChatInputCommandInteraction) {
        const channel: Channel | null = await interaction.client.channels.fetch(interaction.channelId);
        const isDM: boolean = channel instanceof DMChannel;
        const isRepliable: boolean = interaction.isRepliable();
        const isReplied: boolean = interaction.replied;

        if (isRepliable) {
          // debugger;
          // await interaction.webhook.send(options);
          if (isDM) await this.sendDM(interaction, options);
          else if (isReplied) await interaction.followUp(options);
          else await interaction.reply(options);
        } else console.error('Unknown command', interaction);
      } else console.warn('No repliable command', interaction);
    } catch (error: any) {
      await this.onError(error, interaction, options);
    }
  };

  sendDM = async (interaction: BaseInteraction, options: string | MessagePayload | InteractionReplyOptions): Promise<void> => {
    if (typeof options === 'string') await interaction.user.send({ content: options });
    else if (options instanceof MessagePayload) await interaction.user.send(options);
    else await interaction.user.send({ content: options.content });
  };

  onError = async (error: any, interaction: BaseInteraction, options: string | MessagePayload | InteractionReplyOptions): Promise<void> => {
    if (error.code === 'InteractionNotReplied') console.warn(error?.message ?? '', interaction);
    else await this.onUnknownInteraction(interaction, options);
  };

  onUnknownInteraction = async (interaction: BaseInteraction, options: string | MessagePayload | InteractionReplyOptions): Promise<void> => {
    if (!(interaction instanceof ChatInputCommandInteraction)) {
      console.warn('Unknown interaction', interaction);
      return;
    }
    if (typeof options === 'string') await interaction.user.send(options);
    else if (options instanceof MessagePayload) await interaction.user.send(options);
    else await interaction.user.send({ content: options.content });
  };

  isInteractionSavedOnCache = async (interaction: BaseInteraction): Promise<boolean> => {
    let savedInCache: boolean = false;

    if (interaction.inCachedGuild()) {
      await interaction.guild?.fetch();
      savedInCache = true;
    }

    return savedInCache;
  };

  run = async (_client: Client, _interaction: BaseInteraction): Promise<void> => {};
}

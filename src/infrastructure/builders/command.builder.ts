import {
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  InteractionReplyOptions,
  MessagePayload,
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
      if (interaction instanceof ChatInputCommandInteraction) {
        if (interaction.isRepliable()) {
          if (interaction.replied) await interaction.followUp(options);
          else await interaction.reply(options);
        }
      } else {
        console.warn('No repliable command', interaction);
      }
    } catch (error: any) {
      if (error.message && typeof error.message === 'string') {
        if (error.message === 'Unknown interaction') {
          console.warn('Unknown interaction', interaction);
        }
      } else {
        console.error(error);
      }
    }
  };

  isInteractionSavedOnCache = async (interaction: BaseInteraction): Promise<boolean> => {
    let savedInCache: boolean = false;

    if (interaction.inCachedGuild()) {
      await interaction.guild?.fetch();
      savedInCache = true;
    }

    return savedInCache;
  };

  run = async (_client: Client, _interaction: BaseInteraction): Promise<void> => {
  };
}

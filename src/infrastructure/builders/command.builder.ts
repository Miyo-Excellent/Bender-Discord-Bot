import {
  ChatInputCommandInteraction,
  Client,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder
} from 'discord.js';
import {CommandBuilderOptions} from '@schemas/command.builderOptions.schema';
import {CommandBuilderDataType} from '@t/commandBuilderData.type';
import {Command} from '@schemas/command.schema';
import {CommandInterface} from '@interfaces/command.interface';

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

  run = async (_client: Client, _interaction: ChatInputCommandInteraction): Promise<void> => {
  };
}
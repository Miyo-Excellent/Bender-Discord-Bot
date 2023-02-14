import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  Client,
  RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js';
import {CommandBuilderDataType} from '@t/commandBuilderData.type';

export interface CommandInterface extends ChatInputApplicationCommandData {
  json: RESTPostAPIChatInputApplicationCommandsJSONBody;
  data: CommandBuilderDataType;
  run: (client: Client, interaction: ChatInputCommandInteraction) => void;
}

import {
  BaseInteraction,
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  Client,
  InteractionReplyOptions,
  MessagePayload,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { CommandBuilderDataType } from '@t/commandBuilderData.type';

export interface CommandInterface extends ChatInputApplicationCommandData {
  json: RESTPostAPIChatInputApplicationCommandsJSONBody;
  data: CommandBuilderDataType;

  run(client: Client, interaction: ChatInputCommandInteraction): Promise<void>;

  reply(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  sendDM(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  onError(error: any, interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  onUnknownInteraction(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  isInteractionSavedOnCache(interaction: BaseInteraction): Promise<boolean>;
}

import {
  AutocompleteInteraction,
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  InteractionReplyOptions,
  MessagePayload,
  ModalSubmitInteraction,
  TextInputModalData,
} from 'discord.js';
import { Command } from '@schemas/command.schema';

export interface BotInterface {
  readonly client: Client;
  commandsPath: string;
  commands: Command[];
  username: string;

  getCommandByName(commandName: string): Command | undefined;

  start(): Promise<void>;

  onChatInputCommandInteraction(interaction: ChatInputCommandInteraction): Promise<void>;

  onAutocompleteInteraction(interaction: AutocompleteInteraction): Promise<void>;

  onClientReady(client: Client<true>): Promise<void>;

  onInteractionCreate(interaction: BaseInteraction, ..._args: any[]): Promise<void>;

  onModalSubmit(interaction: ModalSubmitInteraction): Promise<void>;

  setCommands(commands: Command[]): Promise<void>;

  onProcessModalData(data: TextInputModalData, interaction: ModalSubmitInteraction): Promise<void>;

  reply(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  reply(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  sendDM(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  onError(error: any, interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  onUnknownInteraction(interaction: BaseInteraction, output: string | MessagePayload | InteractionReplyOptions): Promise<void>;
}

import { ChatInputCommandInteraction, Client } from 'discord.js';
import { CommandInterface } from '@interfaces/command.interface';
import { CommandBuilderOptions } from '@schemas/command.builderOptions.schema';

export class CommandBuilder implements CommandInterface {
  public description: string;
  public name: string;

  constructor(options?: CommandBuilderOptions) {
    this.description = options?.description ?? '';
    this.name = options?.name ?? '';
  }

  async run(_client: Client, _interaction: ChatInputCommandInteraction): Promise<void> {}
}
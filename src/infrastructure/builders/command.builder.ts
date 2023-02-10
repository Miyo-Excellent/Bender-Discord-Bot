import { CommandInterface } from '../../domain/interfaces/command.interface';
import { Client, CommandInteraction } from 'discord.js';

export interface CommandBuilderOptions {
  description: string;
  name: string;
}

export class CommandBuilder implements CommandInterface {
  public description: string;
  public name: string;

  constructor(options: CommandBuilderOptions) {
    this.description = options.description;
    this.name = options.name;
  }

  async run(_client: Client, _interaction?: CommandInteraction): Promise<void> {}
}
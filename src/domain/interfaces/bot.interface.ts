import {CommandInterface} from './command.interface';
import {EventInterface} from './event.interface';
import {Client} from 'discord.js';

export interface BotInterface {
    readonly client: Client;
    commandsPath: string;
    eventsPath: string;
    commands: CommandInterface[];
    events: EventInterface[];
}

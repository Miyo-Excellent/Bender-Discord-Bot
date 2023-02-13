import {Client} from 'discord.js';
import {CommandInterface} from '@interfaces/command.interface';
import {EventInterface} from '@interfaces/event.interface';

export interface BotInterface {
    readonly client: Client;
    commandsPath: string;
    eventsPath: string;
    commands: CommandInterface[];
    events: EventInterface[];
}

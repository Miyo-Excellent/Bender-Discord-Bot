import { z } from 'zod';
import { EventBuilder } from '@builders/event.builder';

export const EventSchema = z.instanceof(EventBuilder);

export type Event = z.infer<typeof EventSchema>;

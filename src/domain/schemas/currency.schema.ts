import { number, string, z } from 'zod';

export const CurrencySchema = z.object({
  base: string(),
  code: string(),
  rate: number(),
});

export type Currency = z.infer<typeof CurrencySchema>;

export class Environment {
  public readonly defaultLanguage: string = process.env.DEFAULT_LANGUAGE ?? '';
  public readonly discordToken: string = process.env.DISCORD_TOKEN ?? '';
  public readonly discordClientId: string = process.env.DISCORD_CLIENT_ID ?? '';
  public readonly discordGuildId: string = process.env.DISCORD_GUILD_ID ?? '';
  public readonly discordClientVersion: string = process.env.DISCORD_CLIENT_VERSION ?? '';
  public readonly discordCommandPrefix: string = process.env.DISCORD_COMMAND_PREFIX ?? '';
  public readonly openAiApiKey: string = process.env.OPEN_AI_API_KEY ?? '';
  public readonly geminiAiApiKey: string = process.env.GEMINI_AI_API_KEY ?? '';
  public readonly exchangeRateBaseUrl: string = process.env.EXCHANGE_RATE_BASE_URL ?? '';
  public readonly apiLayerExchangeRateApiKey: string = process.env.API_LAYER_EXCHANGE_RATE_API_KEY ?? '';
}

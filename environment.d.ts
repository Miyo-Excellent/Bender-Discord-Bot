// @ts-ignore
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DEFAULT_LANGUAGE: string;
      readonly DISCORD_TOKEN: string;
      readonly DISCORD_CLIENT_ID: string;
      readonly DISCORD_GUILD_ID: string;
      readonly DISCORD_CLIENT_VERSION: string;
      readonly DISCORD_COMMAND_PREFIX: string;
      readonly OPEN_AI_API_KEY: string;
      readonly GEMINI_AI_API_KEY: string;
      readonly EXCHANGE_RATE_BASE_URL: string;
      readonly API_LAYER_EXCHANGE_RATE_API_KEY: string;
    }
  }
}

import { GatewayIntentBits, Partials } from "discord.js";
import Bot from "./Bot";
import setupCommands from "./commands";
import { setupBotEvents, setupDatabaseEvents } from "./events";

if (!process.env.DISCORD_TOKEN) {
  console.error("No Discord token provided.");
  process.exit(1);
}

if (!process.env.COBALT_API_URL) {
  console.error("No Cobalt API URL provided.");
  process.exit(1);
}

// Creating an instance of the Discord.js client
const bot = new Bot({
  discord: {
    intents: [
      GatewayIntentBits.Guilds, //
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
  },
  acebase: {
    type: "local",
    databaseName: "bot",
  },
  cobalt: {
    url: process.env.COBALT_API_URL,
    apiKey: process.env.COBALT_API_KEY,
  },
});

setupCommands(bot);
setupBotEvents(bot);
setupDatabaseEvents(bot.db);

// Logging in with the Discord token
bot.login(process.env.DISCORD_TOKEN);

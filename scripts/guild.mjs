import { getCommandsData } from "../app/utils/getCommands.mjs";
import register from "./register.mjs";

const commands = getCommandsData();

for (const command of commands) {
  command.name += "-dev";
}

register(
  `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`,
  Object.values(commands)
);

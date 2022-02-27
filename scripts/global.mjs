import { getCommandsData } from "../app/utils/getCommands.mjs";
import register from "./register.mjs";

const commands = getCommandsData();

register(
  `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/commands`,
  Object.values(commands)
);

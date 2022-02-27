import { getCommandsData } from "../app/utils/getCommands.js";
import register from "./register.js";

const commands = getCommandsData();

register(
  `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/commands`,
  Object.values(commands)
);

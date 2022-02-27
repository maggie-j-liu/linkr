import * as commands from "../commands/index.mjs";

export const getCommands = () => {
  return Object.values(commands);
};

export const getCommandsData = () => {
  const data = Object.values(commands);
  const filteredData = [];
  for (const command of data) {
    const { execute, ...filtered } = command;
    filteredData.push(filtered);
  }
  return filteredData;
};

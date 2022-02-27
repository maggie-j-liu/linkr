import createMessage from "../utils/createMessage.mjs";

const ping = {
  name: "ping",
  description: "Check if the bot is there.",
  execute: async (_message) => {
    return createMessage("pong!");
  },
};

export default ping;

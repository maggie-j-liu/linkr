import {
  InteractionResponseFlags,
  InteractionResponseType,
} from "discord-interactions";

const createMessage = (message, ephemeral = false) => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: message,
      flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : undefined,
    },
  };
};

export default createMessage;

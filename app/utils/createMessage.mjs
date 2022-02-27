import {
  InteractionResponseFlags,
  InteractionResponseType,
} from "discord-interactions";

const createMessage = (message, ephemeral = false) => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: message,
      flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : undefined,
    },
  };
};

export default createMessage;

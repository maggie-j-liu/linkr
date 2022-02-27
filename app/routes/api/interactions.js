import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { json } from "remix";
import { getCommands } from "../../utils/getCommands.mjs";

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    console.error("Unknown Type");
    return json(
      {
        error: "Unknown Type",
      },
      400
    );
  }
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  const body = await request.json();
  const rawBody = JSON.stringify(body);

  if (
    !signature ||
    !timestamp ||
    !verifyKey(rawBody, signature, timestamp, process.env.PUBLIC_KEY)
  ) {
    return json({ error: "Bad request signature" }, 401);
  }

  const message = body;

  if (message.type === InteractionType.PING) {
    return {
      type: InteractionResponseType.PONG,
    };
  } else if (message.type === InteractionType.APPLICATION_COMMAND) {
    const commands = getCommands();
    const command = commands.find(
      (c) =>
        c.name === message.data.name.toLowerCase() ||
        c.name + "-dev" === message.data.name.toLowerCase()
    );
    if (command) {
      return await command.execute(message);
    }
  }
};

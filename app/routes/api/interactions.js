import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { json } from "remix";
import createMessage from "~/utils/createMessage.mjs";
import db from "~/utils/database.mjs";
import getLink from "~/utils/getLink.mjs";
import getUserId from "~/utils/getUserId.mjs";
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
  } else if (message.type === InteractionType.MESSAGE_COMPONENT) {
    if (message.data.custom_id.startsWith("delete-")) {
      const key = message.data.custom_id.substr(7);
      await db.delete(key);
      return createMessage(`Deleted link ${process.env.DOMAIN}/${key}`);
    } else if (message.data.custom_id.startsWith("clear-")) {
      const key = message.data.custom_id.substr(6);
      try {
        await db.update({ clicks: 0 }, key);
        return createMessage(
          `Set the clicks for <${process.env.DOMAIN}/${key}> to 0.`,
          true
        );
      } catch (e) {
        return createMessage(
          `The short link ${process.env.DOMAIN}/${key} doesn't exist.`,
          true
        );
      }
    } else if (message.data.custom_id.startsWith("clicks-")) {
      const key = message.data.custom_id.substr(7);
      const userId = getUserId(message);
      const result = await getLink(key, userId);
      if (result.error) {
        return createMessage(result.error, true);
      }
      return createMessage(
        `The short link <${process.env.DOMAIN}/${key}> has been visited ${
          result.clicks
        } time${result.clicks !== 1 ? "s" : ""}.`,
        true
      );
    }
    console.log(message);
    return null;
  }
};

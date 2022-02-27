import resolveRoute from "../utils/resolveRoute.mjs";
import db from "../utils/database.mjs";
import createMessage from "../utils/createMessage.mjs";
import getUserId from "../utils/getUserId.mjs";
const stats = {
  name: "stats",
  description: "Get statistics about a short link.",
  options: [
    {
      name: "route",
      type: 3,
      description: "The route of the short URL you want to get stats for.",
      required: true,
    },
  ],
  execute: async (message) => {
    const route = message.data.options.find(
      (opt) => opt.name === "route"
    ).value;
    const key = resolveRoute(route);
    const link = await db.get(key);
    if (link === null) {
      return createMessage(
        `The short link ${process.env.DOMAIN}/${key} doesn't exist.`,
        true
      );
    }
    if (link.userId != getUserId(message)) {
      return createMessage("This short link was not created by you.", true);
    }
    return createMessage(
      `The short link <${process.env.DOMAIN}/${key}> links to ${
        link.url
      } and has been visited ${link.clicks} time${
        link.clicks !== 1 ? "s" : ""
      }.`,
      true
    );
  },
};
export default stats;

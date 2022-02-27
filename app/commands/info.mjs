import resolveRoute from "../utils/resolveRoute.mjs";
import createMessage from "../utils/createMessage.mjs";
import getUserId from "../utils/getUserId.mjs";
import createMenu from "../utils/createMenu.mjs";
import getLink from "../utils/getLink.mjs";
const info = {
  name: "info",
  description: "Get info about a short link.",
  options: [
    {
      name: "route",
      type: 3,
      description: "The route of the short URL you want to get info for.",
      required: true,
    },
  ],
  execute: async (message) => {
    const route = message.data.options.find(
      (opt) => opt.name === "route"
    ).value;
    const key = resolveRoute(route);
    const userId = getUserId(message);
    const result = await getLink(key, userId);
    if (result.error) {
      return createMessage(result.error, true);
    }
    return createMessage(
      `The short link <${process.env.DOMAIN}/${key}> links to ${
        result.url
      } and has been visited ${result.clicks} time${
        result.clicks !== 1 ? "s" : ""
      }.`,
      true,
      createMenu(result.key)
    );
  },
};
export default info;

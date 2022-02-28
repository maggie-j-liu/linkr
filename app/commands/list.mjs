import createMessage from "../utils/createMessage.mjs";
import db from "../utils/database.mjs";
import getUserId from "../utils/getUserId.mjs";
const list = {
  name: "list",
  description: "List all of your short links",
  execute: async (message) => {
    const userId = getUserId(message);
    const { items: allLinks } = await db.fetch({
      userId,
    });
    const linksMessage = allLinks
      .sort((a, b) => {
        if (a.clicks !== b.clicks) {
          return a.clicks > b.clicks ? -1 : 1;
        }
        return a.key < b.key ? -1 : 1;
      })
      .map(
        (link, i) =>
          `${i + 1}. <${process.env.DOMAIN}/${link.key}> -> ${link.url}, ${
            link.clicks
          } click${link.clicks !== 1 ? "s" : ""}`
      );
    return createMessage(linksMessage.join("\n"));
  },
};
export default list;

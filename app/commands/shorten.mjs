import createMenu from "../utils/createMenu.mjs";
import createMessage from "../utils/createMessage.mjs";
import createShortLink from "../utils/createShortLink.mjs";
import getUserId from "../utils/getUserId.mjs";
import validateUrl from "../utils/validateUrl.mjs";

const shorten = {
  name: "shorten",
  description: "Create a short link.",
  options: [
    {
      name: "url",
      description: "The long url you would like to shorten.",
      type: 3, // STRING
      required: true,
    },
    {
      name: "route",
      type: 3,
      description: "The route of the short URL you want to use.",
    },
  ],
  execute: async (message) => {
    const url = message.data.options.find((opt) => opt.name === "url").value;
    const route = message.data.options.find(
      (opt) => opt.name === "route"
    )?.value;
    const valid = validateUrl(url);
    if (valid !== true) {
      return valid;
    }

    const userId = getUserId(message);
    const response = await createShortLink({
      url,
      slug: route,
      userId,
    });
    let content;
    if (response.error) {
      content = `Error: ${response.error}`;
    } else {
      content = `Created <${process.env.DOMAIN}/${response.slug}> as a short link for ${url}`;
    }
    return createMessage(content, false, createMenu(response.slug));
  },
};

export default shorten;

import db from "./database.mjs";

const getLink = async (key, userId) => {
  const link = await db.get(key);
  if (link === null) {
    return {
      error: `The short link ${process.env.DOMAIN}/${key} doesn't exist.`,
    };
  }
  if (link.userId != userId) {
    return { error: "This short link was not created by you." };
  }
  return link;
};

export default getLink;

const validateUrl = (url) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return createMessage("Please specify a valid URL.", true);
  }
  if (
    url.startsWith(process.env.DOMAIN) ||
    url.startsWith(process.env.DOMAIN.replace("https://", "http://"))
  ) {
    return createMessage("URL domain banned", true);
  }
  return true;
};
export default validateUrl;

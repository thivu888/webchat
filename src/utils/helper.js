export const ORIGIN_TEXT = /(<([^>]+)>)/gi;

export const setURL = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (typeof text !== "string") {
    return text;
  }

  return text.replace(urlRegex, (url) => {
    const urlOrigin = url.replace(ORIGIN_TEXT, "");
    return `<a href="${urlOrigin}" class="link_href_post_details">${urlOrigin}</a>`;
  });
};

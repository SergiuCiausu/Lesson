export const checkReqLength = (files, links, text, maxLength) => {
  const total = files.length + links.length + text.length;
  return total <= maxLength;
};

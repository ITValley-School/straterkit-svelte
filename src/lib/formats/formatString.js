export const formatText = (text) => {
  const replacedText = text.replace(/_/g, " ");
  return replacedText.charAt(0).toUpperCase() + replacedText.slice(1);
};

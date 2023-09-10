export const getBoldTextHtml = (htmlString: string): string[] => {
  const strongTagRegex = /<strong>(.*?)<\/strong>/g;
  const textArray: string[] = [];
  let match;
  while ((match = strongTagRegex.exec(htmlString)) !== null) {
    textArray.push(match[1].trim());
  }

  return textArray;
};

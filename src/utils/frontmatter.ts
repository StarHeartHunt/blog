import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export const remarkReadingTime: RemarkPlugin =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (options = {}) =>
  (tree, { data }) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    if (data.astro?.frontmatter)
      data.astro.frontmatter.minutesRead = readingTime.text;
  };

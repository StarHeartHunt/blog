import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://baka.icu',
  markdown: {
    syntaxHighlight: false,
    shikiConfig: { theme: 'one-dark-pro' },
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
          },
          content: {
            type: 'text',
            value: '\u200B',
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          keepBackground: true,
          // Callback hooks to add custom logic to nodes when visiting
          // them.
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node) {
            // Each word node has no className by default.
            node.properties.className = ['word'];
          },
        },
      ],
    ],
  },
  integrations: [mdx(), sitemap(), tailwind(), react()],
});

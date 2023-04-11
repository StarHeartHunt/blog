import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { remarkReadingTime } from './src/utils/frontmatter';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://baka.icu',
  markdown: {
    syntaxHighlight: false,
    shikiConfig: {
      theme: 'one-dark-pro',
    },
    remarkPlugins: [remarkReadingTime],
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
              node.children = [
                {
                  type: 'text',
                  value: ' ',
                },
              ];
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
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,
      logger: 1,
    }),
  ],
});

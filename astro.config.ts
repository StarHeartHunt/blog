import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import Icons from 'unplugin-icons/vite';
import { remarkReadingTime } from './src/utils/frontmatter';

// https://astro.build/config
export default defineConfig({
  site: 'https://baka.icu',
  markdown: {
    syntaxHighlight: false,
    shikiConfig: {
      theme: 'one-dark-pro',
    },
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: 'Table of contents',
        },
      ],
      remarkReadingTime,
    ],
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
          onVisitLine(node: { children: string | unknown[] }) {
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
          onVisitHighlightedLine(node: {
            properties: {
              className: string[];
            };
          }) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node: {
            properties: {
              className: string[];
            };
          }) {
            // Each word node has no className by default.
            node.properties.className = ['word'];
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [
      Icons({ compiler: 'jsx', jsx: 'react' }),
      Icons({
        compiler: 'astro',
      }),
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
  ],
});

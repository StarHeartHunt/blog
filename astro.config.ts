import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { defineConfig } from "astro/config";
import { dirname, resolve } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import Icons from "unplugin-icons/vite";
import { fileURLToPath } from "url";
import { remarkReadingTime } from "./src/utils/frontmatter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: "https://baka.icu",
  markdown: {
    syntaxHighlight: false,
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
          },
          content: {
            type: "text",
            value: "\u200B",
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: true,
          // Callback hooks to add custom logic to nodes when visiting
          // them.
          onVisitLine(node: { children: string | unknown[] }) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [
                {
                  type: "text",
                  value: " ",
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
            node.properties.className.push("highlighted");
          },
          onVisitHighlightedWord(node: {
            properties: {
              className: string[];
            };
          }) {
            // Each word node has no className by default.
            node.properties.className = ["word"];
          },
        },
      ],
    ],
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [Icons({
      compiler: "astro",
    }), tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    preact(),
  ],
});

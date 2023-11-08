const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "h2, h3, h4": {
              "scroll-margin-top": "var(--scroll-mt)",
            },
            a: {
              "text-decoration": "none",
            },
            "a:hover": {
              color: "var(--tw-prose-invert-links)",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      }),
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
      fira: ["Fira Code", ...defaultTheme.fontFamily.mono],
      source: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      "ubuntu-mono": ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

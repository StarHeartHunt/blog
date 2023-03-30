const withMT = require('@material-tailwind/html/utils/withMT');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = withMT({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: defaultTheme.fontFamily.sans,
        serif: defaultTheme.fontFamily.serif,
        mono: defaultTheme.fontFamily.mono,
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
});

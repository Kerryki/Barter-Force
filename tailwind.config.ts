import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2C2C2C',
        gold: '#D4A574',
        // Darker gold for text on light backgrounds (4.8:1 on warm-white; plain gold is 2:1)
        'gold-dark': '#8C6226',
        'warm-white': '#F5F1E8',
        graphite: '#5C5C5C',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
      typography: {
        charcoal: {
          css: {
            '--tw-prose-body': '#2C2C2C',
            '--tw-prose-headings': '#2C2C2C',
            '--tw-prose-lead': '#5C5C5C',
            '--tw-prose-links': '#8C6226',
            '--tw-prose-bold': '#2C2C2C',
            '--tw-prose-counters': '#D4A574',
            '--tw-prose-bullets': '#D4A574',
            '--tw-prose-hr': '#D4A574',
            '--tw-prose-th-borders': '#D4A574',
            '--tw-prose-td-borders': '#E5E7EB',
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        deep: 'var(--deep)',
        'on-deep': 'var(--on-deep)',
        gold: 'var(--gold)',
        'gold-soft': 'var(--gold-soft)',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

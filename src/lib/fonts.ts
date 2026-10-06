import { Cormorant_Garamond, Manrope } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
});

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
});

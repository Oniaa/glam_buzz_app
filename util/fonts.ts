import { Montserrat, Poppins, Quicksand, Raleway } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export const poppins = Poppins({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

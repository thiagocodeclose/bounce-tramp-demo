// @ts-nocheck
import type { Metadata } from 'next';
import { Nunito, Nunito_Sans } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-nunito',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'BOUNCE Trampoline Fitness — Austin, TX | Jump. Fly. Feel Alive.',
  description: 'Austin\'s most energetic workout. Low-impact, high-intensity trampoline fitness classes. 30 pro trampolines. 600+ active jumpers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

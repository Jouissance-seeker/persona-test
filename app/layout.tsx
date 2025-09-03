import './globals.css';
import { cn } from '@/utils/cn';
import { Vazirmatn } from 'next/font/google';
import { PropsWithChildren } from 'react';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(
          vazirmatn.className,
          'flex min-h-dvh flex-col items-center justify-center',
        )}
      >
        {props.children}
      </body>
    </html>
  );
}

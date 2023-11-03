import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import { Menu } from '@/components/Menu';
import paths from '@/static/paths.json';
import { PlainMenuItemModel } from '@/models';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const menu: PlainMenuItemModel[] = [];
  paths.map((item) => {
    if (item.menu) {
      menu.push({ name: item.name, link: item.link });
    }
    return item;
  });

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-300`}
      >
        <Menu menu={menu} />
        {children}
      </body>
    </html>
  );
}

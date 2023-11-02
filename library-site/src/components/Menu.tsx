'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { PlainMenuItemModel } from '@/models';
import { Breadcrumbs } from './Breadcrumbs';
import paths from '@/static/paths.json';

type MenuProps = {
  menu: PlainMenuItemModel[];
};

export const Menu: FC<MenuProps> = ({ menu }) => {
  const path = usePathname();
  const title = paths.filter((item) => path.match(item.regex))[0].name;

  return (
    <div className="w-full flex justify-around items-center p-1 gap-4 sm:gap-8 md:gap-16 lg:gap-24">
      <span className="hidden lg:block text-3xl">{title}</span>
      <span className="flex">
        {menu.map((item) => (
          <a
            className={`mr-4 hover:bg-slate-700 font-bold py-2 px-4 rounded ${
              title === item.name ? 'text-purple-500' : 'text-gray-100'
            }`}
            href={item.link}
            key={item.name}
            data-testid={item.name}
          >
            {item.name}
          </a>
        ))}
      </span>
      <div className="justify-end hidden lg:flex">
        <span className=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Breadcrumbs root="Home" />
          </span>
        </span>
      </div>
    </div>
  );
};

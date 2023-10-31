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
    <div className="w-full bg-slate-600 grid grid-cols-3 p-1">
      <span className="flex">
        {menu.map((item) => (
          <a
            className="mr-4 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            href={item.link}
            key={item.name}
            data-testid={item.name}
          >
            {item.name}
          </a>
        ))}
      </span>
      <span className="text-3xl m-auto">{title}</span>
      <span className="flex justify-end">
        <span className="p-2 bg-slate-700 border border-collapse rounded float-right">
          <Breadcrumbs root="Home" />
        </span>
      </span>
    </div>
  );
};

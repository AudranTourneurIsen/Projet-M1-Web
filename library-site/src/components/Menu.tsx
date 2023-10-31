import { FC } from 'react';
import { PlainMenuItemModel } from '@/models';
import { Breadcrumbs } from './Breadcrumbs';

type MenuProps = {
  menu: PlainMenuItemModel[];
};

export const Menu: FC<MenuProps> = ({ menu }) => (
  <div className="w-full bg-slate-600 p-4">
    <span>
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
    <span>
      <Breadcrumbs root="Home" />
    </span>
  </div>
);

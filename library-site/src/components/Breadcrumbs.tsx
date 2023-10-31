'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { PlainMenuItemModel } from '@/models';

type BreadcrumbsProps = {
  root: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ root = 'books' }) => {
  const path = usePathname();

  const listOfLinks: PlainMenuItemModel[] = [];

  listOfLinks.push({ name: root, link: '/' });
  path.split('/').map((item) => {
    if (item !== '') {
      listOfLinks.push({ name: item, link: `${path.split(item)[0]}${item}` });
    }

    return listOfLinks;
  });

  return (
    <>
      {listOfLinks.map((item) => (
        <span key={item.name}>
          {path.split('/').pop() === item.name ? (
            <span>{item.name}</span>
          ) : (
            <span>
              <a
                href={item.link}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {item.name}
              </a>
              {' > '}
            </span>
          )}
        </span>
      ))}
    </>
  );
};

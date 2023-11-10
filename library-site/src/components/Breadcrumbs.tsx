'use client';

import { FC, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PlainMenuItemModel } from '@/models';
import { useBooksProviders, useUsersProviders } from '@/hooks';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import paths from '@/static/paths.json';

type BreadcrumbsProps = {
  root: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ root = 'books' }) => {
  const path = usePathname();
  const title = paths.filter((item) => path.match(item.regex))[0].name;

  const { useListBooks } = useBooksProviders();
  const { useListAuthors } = useAuthorsProviders();
  const { useListUsers } = useUsersProviders();

  const { books, loadBooks } = useListBooks();
  const { authors, loadAuthors } = useListAuthors();
  const { users, loadUsers } = useListUsers();

  useEffect(() => {
    loadBooks();
    loadAuthors();
    loadUsers();
    // Si on suit la recommendation du linter d'inclure exhaustivement les dépendences ou de supprimer le tableau,
    // cela mène à une boucle infinie de reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getBookById(id: string): string {
    return books.find((b) => b.id === id)?.name || 'Book';
  }

  function getAuthorById(id: string): string {
    const author = authors.find((a) => a.id === id);
    return author ? `${author.firstName} ${author.lastName}` : 'Author';
  }

  function getUserById(id: string): string {
    const user = users.find((u) => u.id === id);
    return user ? `${user.firstName} ${user.lastName}` : 'User';
  }

  function replaceIfNeeded(input: string): string {
    if (input.includes('-')) {
      switch (title) {
        case 'Book':
          return getBookById(input);
        case 'Author':
          return getAuthorById(input);
        case 'User':
          return getUserById(input);
        default:
          return input;
      }
    }
    return input;
  }

  const listOfLinks: PlainMenuItemModel[] = [];

  listOfLinks.push({ name: root, link: '/' });
  path.split('/').map((item) => {
    if (item !== '') {
      listOfLinks.push({
        name: replaceIfNeeded(item),
        link: `${path.split(item)[0]}${item}`,
      });
    }

    return listOfLinks;
  });

  console.log('listOfLinks = ', listOfLinks);

  return (
    <>
      {listOfLinks.map((item) => (
        <span key={item.name}>
          {path.split('/').pop() === item.link.split('/').pop() ? (
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

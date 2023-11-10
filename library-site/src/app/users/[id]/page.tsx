'use client';

import { redirect, useParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { useBooksProviders, useUserProvider, useUsersProviders } from '@/hooks';
import { FavoriteBook } from '@/app/users/[id]/FavoriteBook';
import { FavoriteGenres } from '@/app/users/[id]/FavoriteGenres';
import { useGenresProviders } from '@/hooks/providers/genreProviders';
import { Bookshelf } from '@/app/users/[id]/Bookshelf';
import { FriendList } from '@/app/users/[id]/FriendList';
import { DangerZone } from '@/app/users/[id]/DangerZone';

const UserDetailsPage: FC = () => {
  const { id } = useParams();
  const { useUser } = useUserProvider();
  const { useListBooks } = useBooksProviders();
  const { useListGenres } = useGenresProviders();
  const { useListUsers } = useUsersProviders();

  const { user, loadUser } = useUser(typeof id === 'string' ? id : id[0]);
  const { books, loadBooks } = useListBooks();
  const { genres, loadGenres } = useListGenres();
  const { users, loadUsers } = useListUsers();

  useEffect(() => {
    loadUser();
    loadBooks();
    loadGenres();
    loadUsers();
    // Si on suit la recommendation du linter d'inclure exhaustivement les dépendences ou de supprimer le tableau,
    // cela mène à une boucle infinie de reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id || typeof id !== 'string') {
    redirect('/users');
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  if (user === 'not found') {
    return redirect('/users');
  }

  function reload(): void {
    loadUser();
    loadBooks();
    loadGenres();
    loadUsers();
  }

  return (
    <div className="flex flex-col">
      <div className="m-4 flex items-center justify-center gap-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24">
          <Image
            src="/avatar-default-icon.png"
            alt=""
            className="rounded-full"
            width={512}
            height={512}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
        </div>
      </div>
      <div className="flex flex-col m-6 gap-12 mx-auto">
        <FavoriteBook user={user} books={books} reload={(): void => reload()} />

        <FavoriteGenres
          user={user}
          genres={genres}
          reload={(): void => reload()}
        />

        <Bookshelf user={user} books={books} reload={(): void => reload()} />

        <FriendList user={user} users={users} reload={(): void => reload()} />

        <DangerZone user={user} reload={(): void => reload()} />
      </div>
    </div>
  );
};
export default UserDetailsPage;

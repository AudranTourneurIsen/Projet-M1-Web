import React, { useState } from 'react';
import { PlainGenreModel, PlainUserModel } from '@/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

type FavoriteGenresProps = {
  user: PlainUserModel;
  genres: PlainGenreModel[];
};

export function FavoriteGenres(props: FavoriteGenresProps): React.JSX.Element {
  const { user, genres } = props;

  const [isEditFavoriteGenresModalOpen, setIsEditFavoriteGenresModalOpen] =
    useState(false);

  const favGenres = user.favoriteGenres?.map((genre) => genre.name).join(', ');

  const favGenresText = favGenres
    ? `My favorite genres are ${favGenres}`
    : 'This user has no favorite genres... yet!';

  return (
    <>
      <Modal
        onClose={(): void => setIsEditFavoriteGenresModalOpen(false)}
        isOpen={isEditFavoriteGenresModalOpen}
        title="Edit favorite genres"
      >
        ...
      </Modal>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon icon={faHeart} className="text-red-400" size="xl" />
          Favorite genres
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2">
          {favGenresText}
          <div className="h-3" />
          <Button
            color="info"
            onPress={(): void => setIsEditFavoriteGenresModalOpen(true)}
          >
            Edit favorite genres
          </Button>
        </div>
      </div>
    </>
  );
}

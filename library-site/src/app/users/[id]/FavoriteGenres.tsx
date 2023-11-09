import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { MultiSelectBlock } from '@/components/MultiSelectBlock';
import { PlainGenreModel, PlainUserModel } from '@/models';

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

  const cancel = useCallback(() => {
    setIsEditFavoriteGenresModalOpen(false);
  }, []);

  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedGenreIds(user.favoriteGenres?.map((genre) => genre.id) || []);
  }, [genres, user]);

  const save = useCallback(() => {
    console.log('SAVE', selectedGenreIds);
    setIsEditFavoriteGenresModalOpen(false);
  }, [selectedGenreIds]);

  const genresOptions = genres.map((genre) => ({
    id: genre.id,
    name: genre.name,
  }));

  return (
    <>
      <Modal
        onClose={(): void => setIsEditFavoriteGenresModalOpen(false)}
        isOpen={isEditFavoriteGenresModalOpen}
        title="Edit favorite genres"
      >
        <div className="flex flex-col gap-4">
          <MultiSelectBlock
            options={genresOptions}
            selectedOptionIds={selectedGenreIds}
            setSelectedOptionIds={setSelectedGenreIds}
          />
          <div className="flex justify-between">
            <Button color="info" onPress={cancel}>
              Cancel
            </Button>
            <Button color="success" onPress={save}>
              Save
            </Button>
          </div>
        </div>
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

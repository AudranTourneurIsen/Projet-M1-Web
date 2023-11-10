import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { MultiSelectBlock } from '@/components/MultiSelectBlock';
import { PlainUserModel } from '@/models';
import { API_URL } from '@/utils/constants';

type FriendListProps = {
  user: PlainUserModel;
  users: PlainUserModel[];
  reload: () => void;
};

export function FriendList(props: FriendListProps): React.JSX.Element {
  const { user, users, reload } = props;

  const [isEditFriendListModalOpen, setIsEditFriendListModalOpen] =
    useState(false);

  const cancel = useCallback(() => {
    setIsEditFriendListModalOpen(false);
  }, []);

  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);

  const save = useCallback(async () => {
    console.log('SAVE', selectedFriendIds);
    await axios.post(`${API_URL}/users/${user.id}/edit-friends`, {
      userIds: selectedFriendIds,
    });
    setIsEditFriendListModalOpen(false);
    reload();
  }, [reload, selectedFriendIds, user.id]);

  const friendOptions = users
    .map((u) => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
    }))
    .filter((u) => u.id !== user.id);

  useEffect(() => {
    setSelectedFriendIds(user.friends?.map((f) => f.id) || []);
  }, [user]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-cyan-500"
            size="xl"
          />
          Friends
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2">
          {user.friends?.map((friend) => (
            <div key={friend.id}>
              <div className="flex gap-3">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-cyan-500"
                  size="xl"
                />
                <a href={`/users/${friend.id}`}>
                {friend.firstName} {friend.lastName}
                </a>
              </div>
            </div>
          ))}
          {!user.friends && (
            <div className="flex gap-3">This user has no friends... yet!</div>
          )}

          <div className="h-3" />
          <Button
            color="info"
            onPress={(): void => setIsEditFriendListModalOpen(true)}
          >
            Edit friend list
          </Button>
        </div>
      </div>
      <Modal
        onClose={(): void => setIsEditFriendListModalOpen(false)}
        isOpen={isEditFriendListModalOpen}
        title="Edit friend list"
      >
        <div className="flex flex-col gap-4">
          <MultiSelectBlock
            options={friendOptions}
            selectedOptionIds={selectedFriendIds}
            setSelectedOptionIds={setSelectedFriendIds}
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
    </>
  );
}

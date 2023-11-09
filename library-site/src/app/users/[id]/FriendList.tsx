import React, { useState } from 'react';
import { PlainUserModel } from '@/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

type FriendListProps = {
  user: PlainUserModel;
  users: PlainUserModel[];
};

export function FriendList(props: FriendListProps): React.JSX.Element {
  const { user, users } = props;

  const [isEditFriendListModalOpen, setIsEditFriendListModalOpen] =
    useState(false);

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
                {friend.firstName} {friend.lastName}
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
        ...
      </Modal>
    </>
  );
}

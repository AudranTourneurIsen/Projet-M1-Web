import React, { useState } from 'react';
import { PlainUserModel } from '@/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

type DangerZoneProps = {
  user: PlainUserModel;
};

export function DangerZone(props: DangerZoneProps): React.JSX.Element {
  const { user } = props;

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-orange-500"
            size="xl"
          />
          Danger zone
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2">
          <Button
            color="danger"
            onPress={(): void => setIsDeleteUserModalOpen(true)}
          >
            Delete user
          </Button>
        </div>
      </div>

      <Modal
        onClose={(): void => setIsDeleteUserModalOpen(false)}
        isOpen={isDeleteUserModalOpen}
        title="Delete user"
      >
        ...
      </Modal>
    </>
  );
}
import { type ReactNode, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): ReactNode => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={onClose}
            onKeyDown={(event): void => {
              if (event.key === 'Enter') {
                onClose();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          />
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full p-4"
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-semibold">{title}</h1>
            <Button color="none" onPress={onClose}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  title: '',
};

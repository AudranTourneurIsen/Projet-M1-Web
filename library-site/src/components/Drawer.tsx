import React, {ReactNode, useEffect, useId, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/Button";

type DrawerProps = {
    title: string;
    onClose: () => void;
    isActive: boolean;
    children: React.ReactNode;
};

export const Drawer = ({
    title,
    onClose,
    isActive,
    children,
}: DrawerProps): ReactNode => {
    const id = useId();
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

        if (isActive) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive, onClose]);

    if (!isActive) {
        return null;
    }



    return (
        <>
            <div
                id={id}
                className={`${
                    isActive ? '' : 'transform -translate-x-full'
                } transition-transform fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800`}
                tabIndex={-1}
                aria-labelledby="drawer-label"
            >
                <div className="flex justify-between items-center mb-3">
                <h1 className={'text-2xl font-bold text-center mb-5'}>
                    {title}
                </h1>
                    <Button color="none" onPress={onClose}>
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                    </Button>
                </div>
                {children}
            </div>
        </>
    );
}



'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

const UserDetailsPage: FC = () => {
    const { id } = useParams();

    return (
        <>
            User details &apos;
            {id}
            &apos; not implemented
        </>
    );
};
export default UserDetailsPage;

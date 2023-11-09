'use client';
import {redirect, useParams} from 'next/navigation';
import React, {FC, useEffect, useState} from 'react';
import {useAuthorProvider} from "@/hooks";
import {Button} from "@/components/Button";
import {Modal} from "@/components/Modal";

const AuthorDetailsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { useAuthor } = useAuthorProvider();
  const {id} = useParams();
  const { author, loadAuthor } = useAuthor(id);

  useEffect(() => {
        loadAuthor();
    }, []);

  if (!id || typeof id !== 'string') {
      redirect('/authors');
  }

  if (!author) {
    return <p>Loading...</p>;
  }

  if (author === 'not found') {
    console.log('author not found');
    return redirect('/authors');
  }


  return (
    <>
        Author details &apos;
        {id}
        &apos; not implemented

        <Button
            color="info"
            onPress={(): void => {
                setIsModalOpen(true);
            }}
        >
            Edit
        </Button>
        <Modal
            isOpen={isModalOpen}
            onClose={(): void => {
                setIsModalOpen(false);
            }}
        >
            Edit author: {author.firstName} {author.lastName}
        </Modal>
    </>


  );
};

export default AuthorDetailsPage;

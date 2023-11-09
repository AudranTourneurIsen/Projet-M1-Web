'use client';
import {redirect, useParams} from 'next/navigation';
import React, {FC, useEffect, useState} from 'react';
import {useAuthorProvider} from "@/hooks";
import {Button} from "@/components/Button";
import {Modal} from "@/components/Modal";
import {TextInput} from "@/components/TextInput";

const AuthorDetailsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  const [isModalBooksOpen, setIsModalBooksOpen] = useState<boolean>(false);
  const { useAuthor } = useAuthorProvider();
  const {id} = useParams();
  const { author, loadAuthor } = useAuthor(id);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isBookOpen, setIsBooksOpen] = useState<boolean>(false);
  const onClose = (): void => {
      if (isModalOpen) {
          setIsModalOpen(false);
      }
      if (isModalEditOpen) {
          setIsModalEditOpen(false);
      }
      if (isModalBooksOpen) {
          setIsModalBooksOpen(false);
      }
  };

  const imageRenderer = (imageURL: string): React.JSX.Element => {
    const fullBase64Src = `data:image/png;base64,${imageURL}`;
    return (
        <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={fullBase64Src}
            alt=""
        />
        );
    };


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
      <div className="relative m-10 p-auto">
          <h1 className="text-2xl font-bold text-center">Author Details</h1>
          <div className="mt-5 grid gap-5 border rounded bg-gray-900">
              <div className={"p-4 "}>
                  {author.photo ? (
                      imageRenderer(author.photo?.image)
                  ) : (
                      <span>no photo available</span>
                  )}
              </div>

              <div className="grid grid-cols-8">
                  <h2 className="p-4">Author name :</h2>
                  <h3 className="text-xl font-bold text-center col-span-3 p-4">
                      {author.firstName} {author.lastName}
                  </h3>
              </div>
              <div className="grid grid-cols-8">
                  <h2 className="p-4"> Books written by this author :</h2>
                  <h3 className={"text-xl font-bold text-center col-span-3 p-4"}>
                      {author.books? author.books.map((book) => <a href={`/books/${book.id}`}>{book.name}</a>) : "Couldn't find any books written by this author"}
                  </h3>
              </div>
              <div className={"p-4 grid grid-cols-8"}>
                  <Button color="info"
                          onPress={(): void => {
                              setIsModalBooksOpen(true);
                          }}
                  >
                      Edit book list
                  </Button>
              </div>
          </div>

          <div className={"pt-5"}>
              <Button
                  color="info"
                  onPress={(): void => {
                      setIsModalEditOpen(true);
                  }}
              >
                  Edit author informations
              </Button>


              <Button
                color="danger"
                onPress={(): void => {
                    setIsModalOpen(true);
                }}
            >
                Delete Author
            </Button>
          </div>

          <Modal
              title="Delete Author"
              isOpen={isModalOpen}
              onClose={(): void => {
                  setIsModalOpen(false);
              }}
          >
              <h3 className="text-xl font-bold text-center col-span-3 p-4 text-red-600">
                  Are you sure you want to delete this author :  &nbsp;  {author.firstName}  &nbsp; {author.lastName}
              </h3>
              <div className="flex justify-between ">
                  <Button color="info" onPress={onClose}>
                      Cancel
                  </Button>
                  <Button color="danger" onPress={onClose}>
                      Proceed
                  </Button>
              </div>
          </Modal>


          <Modal
              title="Edit Author Informations"
              isOpen={isModalEditOpen}
              onClose={(): void => {
                  setIsModalEditOpen(false);
              }}
          >

              <div className={"pt-5"}>
                  <div className="flex flex-col bg-white rounded-lg dark:border-gray-700 dark:bg-gray-800  p-2">
                      {author.photo ? (
                          imageRenderer(author.photo?.image)
                      ) : (
                          <span>no photo available</span>
                      )}
                  </div>
                  <div>
                      <form className="flex flex-col gap-8 p-6">
                          <input
                              type="file"
                              // onChange={(event): void => {
                              //     setAuthorImage(event.target.files ? event.target.files[0] : null);
                              // }}
                          />
                          <div className="flex justify-between ">
                              <Button color="success" onPress={onClose}>
                                  Modify image
                              </Button>
                          </div>
                      </form>
                  </div>
                  <div className="flex flex-col gap-8 p-6">
                      <h3 className={"text-center"}>
                          Author current name :  &nbsp;  {author.firstName}  &nbsp; {author.lastName}
                        </h3>

                      <div className="flex justify-between ">
                      <form className="flex flex-col gap-8 p-6">
                            <TextInput
                                label="Author's new first name"
                                // onChange={(newName): void => {
                                //     setAuthorFirstName(newName);
                                // }}
                                // value={authorFirstName}
                            />
                                <Button color="success" onPress={onClose}>
                                    Change first name
                                </Button>
                      </form>
                          <form className="flex flex-col gap-8 p-6">
                              <TextInput
                                  label="Author's last name"
                                      // onChange={(newName): void => {
                                      //     setAuthorLastName(newName);
                                      // }}
                                      // value={authorLastName}
                              />
                              <Button color="success" onPress={onClose}>
                                  Change last name
                              </Button>
                            </form>
                      </div>
                  </div>
                         <Button color="info" onPress={onClose}>
                              Cancel
                         </Button>
              </div>
          </Modal>

          <Modal
              title="Edit Book List"
              isOpen={isModalBooksOpen}
              onClose={(): void => {
                  setIsModalBooksOpen(false);
              }}
          >
              <h3 className="text-xl font-bold text-center col-span-3 p-4 text-red-600">
                  AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </h3>
              <div className="flex justify-between ">
                  <Button color="info" onPress={onClose}>
                      Cancel
                  </Button>
                  <Button color="success" onPress={onClose}>
                      Proceed
                  </Button>
              </div>
          </Modal>
        </div>


  );
};

export default AuthorDetailsPage;

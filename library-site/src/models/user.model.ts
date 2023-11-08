import {PlainBookModel} from "@/models/book.model";
import {PlainGenreModel} from "@/models/genre.model";
import {UserId} from "../../../library-api/src/entities";

export type PlainUserModel = {
    id: UserId;
    firstName: string;
    lastName: string;
    ownedBooks?: PlainBookModel[];
    favoriteBook?: PlainBookModel;
    favoriteGenres?: PlainGenreModel[];
    friends?: PlainUserModel[];
};

import { Book } from "./book.model";

export type SavedBook = Book & {
  savedDate: Date;
};

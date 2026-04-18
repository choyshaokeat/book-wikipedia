"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SavedBook } from "../services/models/savedBook.model";

type SavedBooksState = {
  savedBooks: SavedBook[];
  setSavedBooks: (books: SavedBook[]) => void;
  addOrRemoveBook: (book: SavedBook) => void;
};

export const useSavedBooksStore = create<SavedBooksState>()(
  persist(
    (set) => ({
      savedBooks: [],
      setSavedBooks: (books) => set({ savedBooks: books }),
      addOrRemoveBook: (book) =>
        set((state) => {
          const exists = state.savedBooks.some(
            (savedBook) => savedBook.id === book.id,
          );

          if (exists) {
            return {
              savedBooks: state.savedBooks.filter(
                (savedBook) => savedBook.id !== book.id,
              ),
            };
          }

          return {
            savedBooks: [book, ...state.savedBooks],
          };
        }),
    }),
    { name: "saved-books" },
  ),
);

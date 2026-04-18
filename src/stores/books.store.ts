"use client";

import { searchBooksByTitle } from "@/src/apis/openLibrary";
import { Book } from "@/src/services/models/book.model";
import { create } from "zustand";

type BooksState = {
  books: Book[];
  isLoading: boolean;
  error: string;
  searchBooks: (query: string) => Promise<void>;
};

export const useBookStore = create<BooksState>()((set) => ({
  books: [],
  isLoading: false,
  error: "",
  searchBooks: async (query) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      set({
        books: [],
        error: "Enter a book title to start searching.",
        isLoading: false,
      });
      return;
    }

    const requestId = `${Date.now()}-${normalizedQuery}`;
    latestSearchRequestId = requestId;

    set({
      isLoading: true,
      error: "",
    });

    try {
      const books = await searchBooksByTitle(normalizedQuery);

      if (latestSearchRequestId !== requestId) {
        return;
      }

      set({
        books,
        error: "",
        isLoading: false,
      });
    } catch {
      if (latestSearchRequestId !== requestId) {
        return;
      }

      set({
        books: [],
        error: "Something went wrong while fetching books. Please try again.",
        isLoading: false,
      });
    }
  },
}));

let latestSearchRequestId = "";

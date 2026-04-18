"use client";

import { searchBooksByTitle } from "@/src/apis/openLibrary";
import { Book } from "@/src/services/models/book.model";
import { create } from "zustand";

type BooksState = {
  books: Book[];
  isLoading: boolean;
  error: string;
  totalPage: number;
  searchBooks: (title: string, page?: number) => Promise<void>;
};

export const useBookStore = create<BooksState>()((set) => ({
  books: [],
  isLoading: false,
  error: "",
  totalPage: 1,
  searchBooks: async (title, pagination = 0) => {
    const normalizedQuery = title.trim();

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
      const { totalPage, books } = await searchBooksByTitle(
        normalizedQuery,
        pagination,
      );

      if (latestSearchRequestId !== requestId) {
        return;
      }

      set({
        books,
        error: "",
        isLoading: false,
        totalPage,
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

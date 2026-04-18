"use client";

import { Book } from "@/src/services/models/book.model";
import { BookCard } from "./BookCard";

type SearchResultsProps = {
  books: Book[];
  error: string;
  isLoading: boolean;
  searchTerm: string;
  isSaved: (bookId: string) => boolean;
  onToggleSavedBook: (book: Book) => void;
};

export const SearchResults = ({
  books,
  error,
  isLoading,
  searchTerm,
  isSaved,
  onToggleSavedBook,
}: SearchResultsProps) => {
  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_24px_80px_rgba(65,38,14,0.08)] backdrop-blur sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-stone-950">
            Search Results
          </h2>
          <p className="text-sm text-stone-500">
            Showing matches for{" "}
            <span className="font-medium text-stone-800">{searchTerm}</span>
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-h-64 animate-pulse rounded-[1.5rem] bg-stone-100"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && !error && books.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-stone-600">
          No books found. Try a different title.
        </div>
      ) : null}

      {!isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              saved={isSaved(book.id)}
              onToggleSavedBook={onToggleSavedBook}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

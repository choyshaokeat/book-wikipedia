"use client";

import { Book } from "@/src/services/models/book.model";
import { useBookStore } from "../stores/books.store";
import BookCard from "./BookCard";
import Paginator from "./Paginator";

type SearchResultsProps = {
  books: Book[];
  error: string;
  isLoading: boolean;
  queriedTitle: string;
  isSaved: (bookId: string) => boolean;
  onToggleSavedBook: (book: Book) => void;
  totalPage?: number;
  pagination: number;
  setPagination: (pagination: number) => void;
};

const SearchResults = ({
  books,
  error,
  isLoading,
  queriedTitle,
  isSaved,
  onToggleSavedBook,
  pagination,
  setPagination,
}: SearchResultsProps) => {
  const totalPage = useBookStore((books) => books.totalPage);

  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_24px_80px_rgba(65,38,14,0.08)] backdrop-blur sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-stone-950">
            Search Results
          </h2>
          <p className="text-sm text-stone-500">
            Showing matches for{" "}
            <span className="font-medium text-stone-800">{queriedTitle}</span>
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error && books.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-stone-600">
          No books found. Try a different title.
        </div>
      ) : null}

      {/* Skeleton */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="min-h-64 animate-pulse rounded-[1.5rem] bg-stone-100"
            />
          ))}
        </div>
      ) : null}

      {/* Books */}
      {!isLoading ? (
        <div>
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
        </div>
      ) : null}

      {/* Paginator */}
      {!error && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Paginator
            pagination={pagination}
            setPagination={setPagination}
            totalPage={totalPage}
          />
        </div>
      )}
    </section>
  );
};

export default SearchResults;

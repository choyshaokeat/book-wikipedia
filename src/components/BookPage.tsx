"use client";

import { SubmitEventHandler, startTransition, useEffect, useState } from "react";
import BookHero from "@/src/components/BookHero";
import SearchResults from "@/src/components/SearchResults";
import SavedBooksPanel from "@/src/components/SavedBooksPanel";
import { useBookStore } from "@/src/stores/books.store";
import { useSavedBooksStore } from "@/src/stores/savedBooks.store";
import { Book } from "@/src/services/models/book.model";
import dayjs from "dayjs";

const INITIAL_QUERY = "harry potter";
const INITIAL_PAGINATION = 0;

export default function BookPage() {
  const [queriedTitle, setQueriedTitle] = useState(INITIAL_QUERY);
  const [queryTitle, setQueryTitle] = useState(INITIAL_QUERY);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);

  const books = useBookStore((s) => s.books);
  const isLoading = useBookStore((s) => s.isLoading);
  const error = useBookStore((s) => s.error);
  const searchBooks = useBookStore((s) => s.searchBooks);
  const savedBooks = useSavedBooksStore((s) => s.savedBooks);
  const addOrRemoveBook = useSavedBooksStore((s) => s.addOrRemoveBook);

  useEffect(() => {
    void searchBooks(queriedTitle, pagination);
  }, [searchBooks, queriedTitle, pagination]);

  const handleSearch: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const nextQuery = queryTitle.trim();

    startTransition(() => {
      setPagination(INITIAL_PAGINATION);
      setQueriedTitle(nextQuery);
    });
  };

  function isSaved(bookId: string) {
    return savedBooks.some((book) => book.id === bookId);
  }

  function onToggleSavedBook(book: Book) {
    addOrRemoveBook({
      ...book,
      savedDate: dayjs().toDate(),
    });
  }

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-6 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_26rem]">
          <div>
            <BookHero
              queryTitle={queryTitle}
              resultCount={books.length}
              savedCount={savedBooks.length}
              onQueryChange={setQueryTitle}
              onSearch={handleSearch}
            />

            <SearchResults
              books={books}
              error={error}
              isLoading={isLoading}
              isSaved={isSaved}
              queriedTitle={queriedTitle}
              onToggleSavedBook={onToggleSavedBook}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>

          <SavedBooksPanel
            books={savedBooks}
            onToggleSavedBook={onToggleSavedBook}
          />
        </div>
      </div>
    </main>
  );
}

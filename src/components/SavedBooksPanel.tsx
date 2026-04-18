"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Book } from "@/src/services/models/book.model";
import { SavedBook } from "../services/models/savedBook.model";

type SavedBooksPanelProps = {
  books: SavedBook[];
  onToggleSavedBook: (book: Book) => void;
};

const SavedBooksPanel = ({
  books,
  onToggleSavedBook,
}: SavedBooksPanelProps) => {
  const [selectedBook, setSelectedBook] = useState<SavedBook | null>(null);

  useEffect(() => {
    if (!selectedBook) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedBook(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedBook]);

  return (
    <>
      <aside className="relative rounded-[2rem] border border-white/70 bg-stone-950 p-5 text-stone-50 shadow-[0_24px_80px_rgba(65,38,14,0.12)] sm:p-6 xl:sticky xl:top-6 xl:flex xl:max-h-[calc(100vh-3rem)] xl:flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">My List</h2>
            <p className="text-sm text-stone-300">To read</p>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm leading-6 text-stone-300">
            Save a few titles from the results and your personal list will
            appear here.
          </div>
        ) : (
          <div className="saved-books-scroll space-y-3 xl:overflow-y-auto">
            {books.map((book) => (
              <article
                key={book.id}
                className="flex items-stretch gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-3"
              >
                <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/10">
                  {book.coverUrl ? (
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-2 text-center text-[11px] text-stone-300">
                      No cover
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">{book.title}</h3>
                    <p className="mt-1 text-sm text-stone-300">
                      {book.authors.join(", ")}
                    </p>
                    {book.savedDate && (
                      <p className="mt-1 text-sm text-stone-300">
                        Saved on {dayjs(book.savedDate).format("YYYY-MM-DD")}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {book.summary.trim() ? (
                      <button
                        className="text-left text-sm !font-semibold text-amber-300 hover:text-amber-200 cursor-pointer"
                        type="button"
                        onClick={() => setSelectedBook(book)}
                      >
                        Summary
                      </button>
                    ) : null}
                    <button
                      className="text-left text-sm !font-semibold text-red-400 hover:text-red-300 cursor-pointer"
                      type="button"
                      onClick={() => onToggleSavedBook(book)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </aside>

      {selectedBook ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="saved-book-summary-title"
        >
          <div
            className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white p-6 text-stone-900 shadow-[0_24px_80px_rgba(20,20,20,0.24)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">
                  Saved Book Summary
                </p>
                <h3
                  id="saved-book-summary-title"
                  className="mt-2 text-2xl font-bold tracking-tight text-stone-950"
                >
                  {selectedBook.title}
                </h3>
                <p className="mt-2 text-sm text-stone-500">
                  {selectedBook.authors.join(", ")}
                </p>
              </div>

              <button
                className="shrink-0 rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 cursor-pointer"
                type="button"
                onClick={() => setSelectedBook(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2 text-base leading-7 text-stone-700">
              {selectedBook.summary}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SavedBooksPanel;

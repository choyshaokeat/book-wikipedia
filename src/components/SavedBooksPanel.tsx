"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { Book } from "@/src/services/models/book.model";
import { SavedBook } from "../services/models/savedBook.model";

type SavedBooksPanelProps = {
  books: SavedBook[];
  onToggleSavedBook: (book: Book) => void;
};

export const SavedBooksPanel = ({
  books,
  onToggleSavedBook,
}: SavedBooksPanelProps) => {
  return (
    <aside className="relative sticky top-0 rounded-[2rem] border border-white/70 bg-stone-950 p-5 text-stone-50 shadow-[0_24px_80px_rgba(65,38,14,0.12)] sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">My List</h2>
          <p className="text-sm text-stone-300">To read</p>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm leading-6 text-stone-300">
          Save a few titles from the results and your personal list will appear
          here.
        </div>
      ) : (
        <div className="space-y-3">
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
                  <h3 className="truncate text-base font-semibold">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-300">
                    {book.authors.join(", ")}
                  </p>
                  {book.savedDate && (
                    <p className="mt-1 text-sm text-stone-300">
                      Saved on {dayjs(book.savedDate).format("YYYY-MM-DD")}
                    </p>
                  )}
                </div>
                <button
                  className="text-left text-sm !font-semibold text-amber-300 hover:text-amber-200 cursor-pointer"
                  type="button"
                  onClick={() => onToggleSavedBook(book)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </aside>
  );
};

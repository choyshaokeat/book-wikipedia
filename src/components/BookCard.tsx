"use client";

import { Book } from "@/src/services/models/book.model";
import Image from "next/image";

type BookCardProps = {
  book: Book;
  saved: boolean;
  onToggleSavedBook: (book: Book) => void;
};

export function BookCard({ book, saved, onToggleSavedBook }: BookCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50">
      <div className="aspect-[4/3] bg-amber-300 p-4">
        <div className="relative h-full w-full">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-stone-500">
              Cover unavailable
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-stone-950">
            {book.title}
          </h3>
          <p className="text-sm font-medium text-amber-700">
            {book.authors.join(", ")}
          </p>
          <p className="line-clamp-5 text-sm leading-6 text-stone-600">
            {book.summary}
          </p>
        </div>

        <button
          className={`mt-auto rounded-full px-4 py-3 text-sm !font-semibold transition cursor-pointer ${
            saved
              ? "bg-stone-200 text-stone-800 hover:bg-stone-300"
              : "bg-black text-white hover:bg-stone-800"
          }`}
          type="button"
          onClick={() => onToggleSavedBook(book)}
        >
          {saved ? "Remove from list" : "Save to list"}
        </button>
      </div>
    </article>
  );
}

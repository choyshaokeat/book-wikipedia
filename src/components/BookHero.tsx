"use client";

import { SubmitEventHandler } from "react";

type BookHeroProps = {
  queryTitle: string;
  resultCount: number;
  savedCount: number;
  onQueryChange: (value: string) => void;
  onSearch: SubmitEventHandler<HTMLFormElement>;
};

const BookHero = ({
  queryTitle,
  resultCount,
  savedCount,
  onQueryChange,
  onSearch,
}: BookHeroProps) => {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(65,38,14,0.08)] backdrop-blur md:p-8 mb-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-xl 2xl:max-w-2xl space-y-3">
          <p className="text-md font-semibold uppercase tracking-[0.28em] text-amber-500">
            Personal Book Finder
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-4xl">
            Search titles, skim summaries, and keep your next reads close.
          </h1>
          <p className="max-w-xl !text-base tracking-tight text- text-stone-600 sm:text-lg">
            Explore books with cover art, author details, and quick summaries,
            then save the ones you want to revisit.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] bg-stone-950 px-8 py-4 text-stone-50 sm:max-w-sm">
          <div>
            <p className="text-3xl text-center font-semibold">{resultCount}</p>
            <p className="text-sm text-center text-stone-300">Search results</p>
          </div>
          <div>
            <p className="text-3xl text-center font-semibold">{savedCount}</p>
            <p className="text-sm text-center text-stone-300">Saved books</p>
          </div>
        </div>
      </div>

      <form
        className="mt-8 flex flex-col gap-3 sm:flex-row"
        onSubmit={onSearch}
      >
        <label className="sr-only" htmlFor="book-search">
          Search books by title
        </label>
        <input
          id="book-search"
          className="min-h-14 flex-1 rounded-full border border-stone-200 bg-stone-50 px-5 text-base outline-none transition focus:border-amber-500 focus:bg-white"
          placeholder="Search by book title"
          value={queryTitle}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <button
          className="min-h-14 rounded-full bg-stone-950 px-6 text-sm !font-semibold text-white transition hover:bg-stone-800 cursor-pointer"
          type="submit"
        >
          Search Books
        </button>
      </form>
    </section>
  );
};

export default BookHero;

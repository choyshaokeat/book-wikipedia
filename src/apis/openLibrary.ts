import { Book } from "@/src/services/models/book.model";

type OpenLibraryDoc = {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  first_sentence?:
    | string
    | { value?: string }
    | Array<string | { value?: string }>;
};

type OpenLibraryResponse = {
  docs?: OpenLibraryDoc[];
};

const normalizeFirstSentence = (
  firstSentence: OpenLibraryDoc["first_sentence"],
) => {
  if (!firstSentence) {
    return null;
  }

  if (typeof firstSentence === "string") {
    return firstSentence;
  }

  if (Array.isArray(firstSentence)) {
    const [firstItem] = firstSentence;

    if (typeof firstItem === "string") {
      return firstItem;
    }

    return firstItem?.value ?? null;
  }

  return firstSentence.value ?? null;
};

const createSummary = (book: OpenLibraryDoc) => {
  const firstSentence = normalizeFirstSentence(book.first_sentence)?.trim();

  if (firstSentence) {
    return firstSentence;
  }

  if (book.first_publish_year) {
    return `First published in ${book.first_publish_year}.`;
  }

  return "No summary available for this book yet.";
};

const getCoverUrl = (coverId?: number) => {
  if (!coverId) {
    return null;
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`;
};

export const searchBooksByTitle = async (query: string): Promise<Book[]> => {
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(
      query,
    )}&fields=key,title,author_name,cover_i,first_publish_year,first_sentence&limit=12`,
  );

  if (!response.ok) {
    throw new Error("Unable to search books right now.");
  }

  const data = (await response.json()) as OpenLibraryResponse;

  return (
    data.docs?.map((book) => ({
      id: book.key,
      title: book.title ?? "Untitled",
      authors: book.author_name ?? ["Unknown author"],
      summary: createSummary(book),
      coverUrl: getCoverUrl(book.cover_i),
    })) ?? []
  );
};

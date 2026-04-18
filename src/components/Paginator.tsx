import React from "react";

interface PaginatorProps {
  totalPage: number;
  pagination: number;
  setPagination: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalPage,
  pagination,
  setPagination,
}) => {
  const pages: (number | string)[] = [];
  if (totalPage <= 10) {
    for (let i = 0; i < totalPage; i++) pages.push(i);
  } else {
    pages.push(0);
    if (pagination > 3) pages.push("...");
    const start = Math.max(1, pagination - 2);
    const end = Math.min(totalPage - 2, pagination + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    if (pagination < totalPage - 4) pages.push("...");
    pages.push(totalPage - 1);
  }
  return (
    <>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => setPagination(page)}
            className={`rounded-lg border px-3 py-1 text-sm ${
              page === pagination
                ? "border-black bg-black text-white"
                : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50 cursor-pointer"
            }`}
          >
            {page + 1}
          </button>
        ) : (
          <span key={index} className="px-2 text-stone-500">
            ...
          </span>
        ),
      )}
    </>
  );
};

export default Paginator;

import Link from "next/link";
import React from "react";
import categoriesData from "@/data/categories.json";

const Navlinks = async () => {
  const data = categoriesData;

  return (
    <div className="sticky top-19.25 z-40 border-b border-[#e1e3e7] bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide"
          aria-label="Categories"
        >
          {data.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors rounded-lg hover:bg-green-50"
            >
              <span aria-hidden="true">{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navlinks;

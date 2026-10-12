"use client";

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group block h-full rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 lg:p-5">
      <div className="mb-3 flex gap-2 sm:gap-3">
        <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gray-100" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-3 pt-3">
        <div className="space-y-1">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-7 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export function ProductSectionSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row justify-between bg-white rounded-3xl p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8">
        <div className="flex-1 min-w-0 lg:pr-8 space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded-xl" />
          <div className="h-10 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-full bg-gray-200 rounded" />
          <div className="h-6 w-40 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto shrink-0">
          <div className="h-48 w-full max-w-75 lg:max-w-125 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </section>
  );
}

export function MarqueeSkeleton() {
  return (
    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white">
      <div className="flex gap-2 overflow-x-auto" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-1.5 mx-4 min-w-70">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryHeaderSkeleton() {
  return (
    <section className="mb-5 sm:mb-7 flex items-center gap-3 sm:gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100" />
      <div className="space-y-2">
        <div className="h-7 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-64 bg-gray-200 rounded" />
      </div>
    </section>
  );
}

export function CategoryPageSkeleton() {
  return (
    <main className="container mx-auto max-w-6xl min-h-screen bg-[#f1f6f0] px-4 sm:px-6 py-6 sm:py-8 md:py-10">
      <div className="flex items-center gap-1 text-gray-500 py-4">
        <span className="text-3xl" aria-hidden="true">‹</span>
        <div className="h-5 w-12 bg-gray-200 rounded" />
      </div>
      <CategoryHeaderSkeleton />
      <div className="mb-3 sm:mb-5">
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      <ProductSectionSkeleton count={6} />
    </main>
  );
}

export function ProductsPageSkeleton() {
  return (
    <main className="container mx-auto max-w-6xl flex flex-col px-4 sm:px-6 py-8 sm:py-10 gap-5">
      <div className="flex items-center gap-1 text-gray-500">
        <span className="text-3xl" aria-hidden="true">‹</span>
        <div className="h-5 w-12 bg-gray-200 rounded" />
      </div>
      <ProductSectionSkeleton count={8} />
    </main>
  );
}

export function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-[#f1f5f0] px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <section className="flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-56 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="rounded-2xl bg-gray-100 px-7 py-5 text-center">
            <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
            <div className="mt-1 h-10 w-24 bg-gray-200 rounded mx-auto" />
            <div className="h-3 w-16 bg-gray-200 rounded mx-auto" />
          </div>
        </section>
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="h-6 w-32 bg-gray-200 rounded mb-5" />
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-5">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="mt-2 h-8 w-20 bg-gray-200 rounded" />
                <div className="mt-2 h-3 w-28 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="h-6 w-40 bg-gray-200 rounded mb-5" />
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full min-w-162.5 text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <th key={i} className="px-5 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, row) => (
                    <tr key={row} className="border-t border-gray-100">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <td key={i} className="px-5 py-4">
                          <div className="h-4 w-20 bg-gray-200 rounded" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export function ProfileSkeleton() {
  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-1">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
        <section className="flex items-center justify-between gap-3 rounded-xl border border-[#e2e9e2] bg-white/80 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-200" />
            <div className="min-w-0 space-y-1">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-40 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded-lg" />
        </section>
        <section className="rounded-xl border border-[#e2e9e2] bg-white/80 p-5 space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-10 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-md" />
        </section>
      </div>
    </main>
  );
}

export function NavlinksSkeleton() {
  return (
    <div className="sticky top-20 z-40 border-b border-[#e1e3e7] bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex gap-2 sm:gap-3 overflow-x-auto pb-2" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white border-[#e1e3e7]">
      <div className="container mx-auto max-w-6xl flex justify-between items-center px-4 sm:px-6 py-3">
        <div className="flex gap-2 sm:gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-13 sm:h-13 bg-gray-200 rounded-lg shrink-0" />
          <div className="min-w-0 hidden sm:block space-y-1">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <div className="h-9 w-20 bg-gray-200 rounded" />
          <div className="h-9 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </header>
  );
}

export function FooterSkeleton() {
  return (
    <div className="border-t border-[#e1e3e7] bg-white mt-8 sm:mt-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-56 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
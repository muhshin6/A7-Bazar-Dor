import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductCard from "@/components/home/ProductCard";
import Link from "next/link";

export async function generateStaticParams() {
  const categories = [...new Set(productsData.map((p) => p.category))];
  return categories.map((category) => ({
    slug: category,
  }));
}

const CategoryDetailsPage = async ({ params }) => {
  const { slug } = await params;

  const products = productsData.filter((product) => product.category === slug);

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon || "🛒";

  return (
    <main className="container mx-auto max-w-6xl min-h-screen bg-[#f1f6f0] px-4 sm:px-6">
      <div className="flex items-center gap-1 text-gray-500 py-4">
        <span className="text-3xl">‹</span>
        <Link href="/" className="text-sm hover:text-green-700 transition-colors">
          হোম
        </Link>
      </div>
      <div className="py-6 sm:py-8 md:py-10">
        {/* Category Header */}
        <section className="mb-5 sm:mb-7 flex items-center gap-3 sm:gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-2xl sm:text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {categoryName} এর আজকের বাজারদর ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Product Count */}
        <div className="mb-3 sm:mb-5">
          <p className="text-sm text-gray-600">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default CategoryDetailsPage;
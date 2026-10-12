import productsData from "@/data/products.json";
import Link from "next/link";

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: String(product.id),
  }));
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  const product = productsData.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f1f5f0] p-10 text-center">
        <h1 className="text-2xl font-bold">পণ্যটি খুঁজে পাওয়া যায়নি!</h1>

        <Link href="/products" className="mt-4 inline-block text-green-600">
          সব পণ্য দেখুন
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => new Intl.NumberFormat("bn-BD").format(price);

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const marketNames = [
    { market: "কারওয়ান বাজার", division: "ঢাকা" },
    { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা" },
    { market: "চৌদগ্রাম বাজার", division: "চট্টগ্রাম" },
    { market: "আমতলী বাজার", division: "চট্টগ্রাম" },
    { market: "সদর বাজার", division: "রাজশাহী" },
    { market: "বাসারহাট বাজার", division: "রাজশাহী" },
    { market: "মাঠ বাজার", division: "ময়মনসিংহ" },
    { market: "চৌর বাজার", division: "ময়মনসিংহ" },
    { market: "বাজারহাট", division: "খুলনা" },
    { market: "ডবলগেট বাজার", division: "খুলনা" },
    { market: "আমবাজার", division: "সিলেট" },
    { market: "চৌরাস্তা বাজার", division: "সিলেট" },
  ];

  // প্রতিটি বাজারে পণ্যের দামের পার্থক্য
  const priceFactors = [
    0.95, 1.04, 1.02, 0.97, 1.05, 0.99, 1.03, 0.96, 1.01, 1.06, 0.98, 1.0,
  ];

  const marketData = marketNames.map((market, index) => {
    const basePrice = Number(product.today);
    const factor = priceFactors[index];

    const min = Math.round(basePrice * factor * 0.95);
    const max = Math.round(basePrice * factor * 1.05);

    return {
      ...market,
      min,
      max,
      avg: (min + max) / 2,
    };
  });

  const prices = marketData.flatMap((market) => [market.min, market.max]);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const avgPrice =
    marketData.reduce((sum, market) => sum + market.avg, 0) / marketData.length;
  return (
    <main className="min-h-screen bg-[#f1f5f0] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/">হোম</Link>
          <span>›</span>
          <Link href="/products">সব পণ্য</Link>
          <span>›</span>
          <span className="text-gray-800">{product.nameBn}</span>
        </div>

        {/* Product Header */}
        <section className="mb-6 flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f1f5f0] text-4xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">প্রতি {product.unit}</p>

              <p className="mt-3 text-sm text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                {product.change?.pct != null && (
                  <span
                    className={`ml-2 font-semibold ${
                      isUp ? "text-rose-600" : "text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {formatPrice(Math.abs(product.change.pct))}%
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#f1f5f0] px-7 py-5 text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>

            <p className="text-sm text-gray-500">টাকা / {product.unit}</p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={minPrice}
              color="text-green-600"
              description="সবচেয়ে কম দামের বাজার"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              price={maxPrice}
              color="text-rose-600"
              description="সবচেয়ে বেশি দামের বাজার"
            />

            <SummaryCard
              title="গড় দাম"
              price={avgPrice}
              color="text-green-700"
              description={`প্রতি ${product.unit} হিসেবে`}
            />
          </div>

          {/* Market Table */}
          <h2 className="mb-5 mt-8 text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-162.5 text-left text-sm">
              <thead className="bg-[#f8faf7] text-gray-500">
                <tr>
                  <th className="px-5 py-4">বাজার</th>
                  <th className="px-5 py-4">বিভাগ</th>
                  <th className="px-5 py-4 text-right">সর্বনিম্ন</th>
                  <th className="px-5 py-4 text-right">সর্বোচ্চ</th>
                  <th className="px-5 py-4 text-right">গড়</th>
                </tr>
              </thead>

              <tbody>
                {marketData.map((market, index) => (
                  <tr
                    key={market.market}
                    className={`border-t border-gray-100 ${
                      index % 2 === 1 ? "bg-[#f1f5f0]" : "bg-white"
                    }`}
                  >
                    <td className="px-5 py-4 font-medium">{market.market}</td>

                    <td className="px-5 py-4 text-gray-500">
                      {market.division}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {formatPrice(market.min)} টাকা
                    </td>

                    <td className="px-5 py-4 text-right">
                      {formatPrice(market.max)} টাকা
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      {formatPrice(market.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const SummaryCard = ({ title, price, color, description }) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 transition hover:shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {new Intl.NumberFormat("bn-BD", {
          maximumFractionDigits: 2,
        }).format(price)}{" "}
        <span className="text-sm font-medium">টাকা</span>
      </p>

      <p className="mt-2 text-xs text-gray-400">{description}</p>
    </div>
  );
};

export default ProductDetailsPage;

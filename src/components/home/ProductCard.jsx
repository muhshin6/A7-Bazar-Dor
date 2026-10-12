import Link from "next/link";

const toBanglaNumber = (value) =>
new Intl.NumberFormat("bn-BD", {
maximumFractionDigits: 1,
}).format(value);

const unitLabels = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রति লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const ProductCard = ({ product }) => {
const { nameBn, image, categoryIcon, unit, today, change, slug } =
product;

const direction = change?.dir ?? "flat";
const percentage = Math.abs(change?.pct ?? 0);

const badgeStyles = {
up: "bg-green-100 text-green-700",
down: "bg-red-100 text-red-700",
flat: "bg-gray-100 text-gray-600",
};

const badgeSymbol = {
up: "▲",
down: "▼",
flat: "—",
};

const unitLabel = unitLabels[unit?.toLowerCase()] ?? `প্রতি ${unit}`;

return (
  <Link
    href={`/products/${product.id}`}
    aria-label={`${nameBn} এর বিস্তারিত দেখুন`}
    className="group block h-full rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
  >
    {" "}
    <div className="mb-3 flex gap-2 sm:gap-3">
      {" "}
      <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-green-50 text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-105">
        {image || categoryIcon || "🛒"}{" "}
      </div>
      <div className="min-w-0">
        <h3 className="mb-1 text-base sm:text-lg font-bold text-gray-800 truncate transition-colors group-hover:text-green-700">
          {nameBn}
        </h3>
        <p className="mb-3 text-xs sm:text-sm text-gray-500 truncate">{unitLabel}</p>
      </div>
    </div>

    <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-3 pt-3">
      <div>
        <p className="mb-1 text-[10px] sm:text-xs text-gray-500">আজকের দাম</p>

        <p className="text-lg sm:text-xl font-extrabold text-gray-900">
          {toBanglaNumber(today)}{" "}
          <span className="text-xs sm:text-sm font-semibold">টাকা</span>
        </p>
      </div>

      <span
        className={`rounded-full px-2 py-1 text-[10px] sm:text-xs font-bold ${
          badgeStyles[direction]
        }`}
      >
        {badgeSymbol[direction]} {toBanglaNumber(percentage)}%
      </span>
    </div>
  </Link>
);
};

export default ProductCard;

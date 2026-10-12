import AllProducts from "./AllProducts";
import ProductCard from "./ProductCard";

const ProductSections = ({ products }) => {
  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const sections = [
    {
      id: "price-up",
      title: "আজ দাম বেড়েছে",
      icon: "▲",
      subtitle: "যেসব পণ্যের দাম আজ বেড়েছে",
      products: risingProducts,
      accent: "text-green-700",
      background: "bg-green-50",
    },
    {
      id: "price-down",
      title: "আজ দাম কমেছে",
      icon: "▼",
      subtitle: "যেসব পণ্যের দাম আজ কমেছে",
      products: fallingProducts,
      accent: "text-red-700",
      background: "bg-red-50",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-14 px-4 sm:px-6">
      {/* Section A and B */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          {" "}
          <div className="mb-4 sm:mb-6 flex flex-col flex-wrap gap-2 sm:gap-3">
            {" "}
            <div className={`flex gap-2 items-center ${section.accent}`}>
              <span className="text-xl sm:text-2xl">{section.icon}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold">{section.title} </h2>
            </div>
            <p className="mt-1 sm:mt-2 text-sm text-gray-500">{section.subtitle}</p>
          </div>
          {section.products.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-gray-50 p-4 sm:p-6 text-center text-gray-500">
              এই মুহূর্তে কোনো তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      ))}

      {/* Section C */}
      <section>{AllProducts({ products })}</section>
    </div>
  );
};

export default ProductSections;

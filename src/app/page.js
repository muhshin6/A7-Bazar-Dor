import Hero from "@/components/Hero";
import ProductSections from "@/components/home/ProductSections";
import productsData from "@/data/products.json";
import Marquee from "@/components/Marquee";

export default function Home() {
  const products = productsData;
  return (
    <div>
      <Marquee />
      <Hero />
      <ProductSections products={products} />
    </div>
  );
}

import AllProducts from '@/components/home/AllProducts';
import productsData from "@/data/products.json";
import Link from 'next/link';

import React from 'react';

const Productspage = () => {
    const products = productsData;
    return (
      <main className="container mx-auto max-w-6xl flex flex-col px-4 sm:px-6 py-8 sm:py-10 gap-5">
        <div className="flex items-center gap-1 text-gray-500">
          <span className="text-3xl">‹</span>
          <Link href="/" className="text-sm hover:text-green-700 transition-colors">
            হোম
          </Link>
        </div>
        <AllProducts products={productsData} />
      </main>
    );
};

export default Productspage;
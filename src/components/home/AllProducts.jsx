import React from 'react';
import ProductCard from './ProductCard';

const AllProducts = ({ products }) => {
    return (
      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
            🛒 সব পণ্য
          </h2>

          <p className="mt-1 sm:mt-2 text-sm text-gray-500">
            নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দাম ও বাজারদরের পরিবর্তন এক জায়গায়।
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-4 sm:p-6 text-center text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    );
};

export default AllProducts;
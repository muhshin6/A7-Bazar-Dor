import React from 'react';
import MarqueeText from 'react-marquee-text';
import "react-marquee-text/dist/styles.css";
import productsData from "@/data/products.json";

const Marquee = async () => {

    const products = productsData.slice(0, 33);

    const toBanglaNumber = (number) => {
      return number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);
    };

    return (
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white">
        <MarqueeText direction="right" duration={12}>
          {products.map((product) => (
            <div key={product.id} className="flex gap-1 sm:gap-1.5 mx-2 sm:mx-4">
              <span aria-hidden="true">{product.image}</span>
              <span className="text-xs sm:text-sm font-medium">{product.nameBn}</span>
              <span className="text-xs sm:text-sm">
                {toBanglaNumber(product.today)} টাকা/কেজি
              </span>
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  product.change.dir === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {Math.abs(product.change.pct)}%
              </span>
            </div>
          ))}
        </MarqueeText>
      </div>
    );
};

export default Marquee;
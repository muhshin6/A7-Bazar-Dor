import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row justify-between bg-white rounded-3xl p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8">
        {/* Left Content */}
        <div className="flex-1 min-w-0 lg:pr-8">
          {/* Eyebrow  */}
          <span className="inline-block rounded-xl px-3 py-1 text-xs sm:text-sm font-semibold text-green-600 bg-green-100">
            {date}
          </span>

          {/* Main Heading */}
          <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}
          <Link
            href="/products#সব-পণ্য"
            className="mt-6 sm:mt-7 inline-flex rounded-lg bg-green-600 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white transition hover:bg-green-700 shadow-lg sm:shadow-2xl text-sm sm:text-base"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Banner Image */}
        <div className="flex justify-center lg:justify-end w-full lg:w-auto shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="BazarDor products"
            width={600}
            height={400}
            className="h-auto w-full max-w-75 lg:max-w-125 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

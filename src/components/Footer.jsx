import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-[#e1e3e7] bg-white mt-8 sm:mt-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 text-sm text-gray-600">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

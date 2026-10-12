"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function NotFound() {
  useEffect(() => {
    toast.error("পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!", {
      id: "not-found",
    });
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-125px)] flex-col items-center justify-center gap-6 bg-[#f1f6f0] px-4 py-12">
      <div className="text-center space-y-4">
        <div className="text-9xl">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900">পৃষ্ঠাটি পাওয়া যায়নি</h1>
        <p className="text-gray-600 max-w-md">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি অস্তিত্বে নেই বা সরানো হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        throw new Error(error.message || "নাম আপডেট করা যায়নি।");
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-125px)] flex-col items-center justify-center gap-4 bg-[#f0f5f0] px-4">
        <h1 className="text-xl font-bold text-[#25352b]">আপনি সাইন ইন করেননি</h1>
        <p className="text-sm text-gray-500">প্রোফাইল আপডেট করতে প্রথমে সাইন ইন করুন।</p>
        <button
          onClick={() => router.replace("/sign-in")}
          className="rounded-lg bg-[#078b42] px-5 py-2 text-sm font-semibold text-white hover:bg-[#067537]"
        >
          সাইন ইন
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-md">
        {/* Back Link */}
        <Link
          href="/profile"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-700 transition-colors"
        >
          <span className="text-3xl">‹</span>
          প্রোফাইলে ফিরে যান
        </Link>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#25352b]">তথ্য আপডেট করুন</h1>
          <p className="mt-2 text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
        </div>

        {/* Form Card */}
        <section className="rounded-xl border border-[#e2e9e2] bg-white/80 p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#25352b]"
              >
                নাম <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name || user.name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                autoFocus
                className="h-12 w-full rounded-lg border border-[#e2e9e2] bg-white px-4 text-base outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Current Email (read-only) */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#25352b]">
                ইমেল
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="h-12 w-full rounded-lg border border-[#e2e9e2] bg-gray-50 px-4 text-base text-gray-600 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">ইমেল পরিবর্তন করা যাবে না।</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[#078b42] text-base font-semibold text-white shadow-md transition hover:bg-[#067537] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#078b42]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  আপডেট হচ্ছে...
                </span>
              ) : (
                "তথ্য আপডেট করুন"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
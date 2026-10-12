"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Profile update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedName = (name ?? user.name ?? "").trim();
    const updatedImage = (image ?? user.image ?? "").trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
        image: updatedImage || null,
      });

      if (error) {
        throw new Error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Proper Better Auth sign out
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "সাইন আউট করা যায়নি।");
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);

      toast.error(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-125px)] items-center justify-center bg-[#f0f5f0]">
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-125px)] flex-col items-center justify-center gap-4 bg-[#f0f5f0] px-4">
        <h1 className="text-xl font-bold text-[#25352b]">
          আপনি সাইন ইন করেননি
        </h1>

        <p className="text-sm text-gray-500">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>

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
    <main className="flex flex-col gap-10 min-h-[calc(100vh-125px)] bg-[#f0f5f0] px-4 py-8 ">
      <div className="mx-auto max-w-md">
        {/* Profile Heading */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#25352b]">আমার প্রোফাইল</h1>

            <p className="mt-1 text-xs text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>
          <Link
            href="/profile/update"
            className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-200"
          >
            ✏️ তথ্য আপডেট করুন
          </Link>
        </div>

        {/* User Information Card */}
        <section className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-[#e2e9e2] bg-white/80 p-4">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={44}
                height={44}
                unoptimized
                className="h-11 w-11 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#e6eee7] text-xl">
                👤
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-[#25352b]">
                {user.name || "আপনার নাম"}
              </h2>

              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="shrink-0 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
          >
            {loggingOut ? "অপেক্ষা করুন..." : "↩ সাইন আউট"}
          </button>
        </section>

        {/* Update Profile Form */}
        <section className="rounded-xl border border-[#e2e9e2] bg-white/80 p-5">
          <h2 className="mb-6 text-sm font-bold text-[#25352b]">
            প্রোফাইল আপডেট
          </h2>

          <form onSubmit={handleUpdate}>
            {/* Name */}
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium text-[#25352b]"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name ?? user.name ?? ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              className="mb-4 h-10 w-full rounded-md border border-[#e2e9e2] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            {/* Profile Image URL */}
            <label
              htmlFor="image"
              className="mb-2 block text-xs font-medium text-[#25352b]"
            >
              প্রোফাইল ছবির URL
            </label>

            <input
              id="image"
              type="url"
              value={image ?? user.image ?? ""}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/profile.jpg"
              className="mb-2 h-10 w-full rounded-md border border-[#e2e9e2] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            <p className="mb-4 text-xs text-gray-500">
              একটি ছবির সরাসরি URL দিন। ছবি আপলোডের সুবিধা এতে অন্তর্ভুক্ত নয়।
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-md bg-[#078b42] text-sm font-semibold text-white shadow-md transition hover:bg-[#067537] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
      <Link href="/" className="flex justify-center">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default ProfilePage;

"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { data: session } = authClient.useSession();
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white border-[#e1e3e7]">
      <div className="container mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        {/* Left: Logo */}
        <div className="shrink-0">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-11 h-11 sm:w-13 sm:h-13 bg-green-800 rounded-lg p-2.5 sm:p-3"
          />
        </div>

        {/* Middle: App name */}
        <div className="flex-1  sm:block">
          <h1 className="text-xl sm:text-2xl font-bold">বাজার দর</h1>
          <p className="text-xs sm:text-sm text-gray-500">{date}</p>
        </div>

        {/* Right: Auth buttons or User dropdown */}
        <div className="shrink-0">
          {session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
                    {session.user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                  {session.user.name}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in-0 zoom-in-95">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    প্রোফাইল
                  </Link>
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="/sign-in"
                className="btn btn-sm sm:btn-md font-semibold"
              >
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="btn btn-sm sm:btn-md font-semibold bg-green-800 text-white"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

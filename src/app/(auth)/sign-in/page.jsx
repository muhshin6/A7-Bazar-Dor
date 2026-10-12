"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import React from "react";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);

  useEffect(() => {
    const toastType = searchParams.get("toast");
    if (toastType === "auth-required") {
      toast.info("এই পৃষ্ঠা দেখনের জন্য লগইন করুন।", { id: "auth-required" });
    }
  }, [searchParams]);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

      console.log("Google Sign In Data:", data);
      console.log("Google Sign In Error:", error);

      if (error) {
        console.error("Error details:", error);
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setIsGitHubLoading(true);
      const { data, error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: callbackUrl,
      });

      console.log("GitHub Sign In Data:", data);
      console.log("GitHub Sign In Error:", error);

      if (error) {
        console.error("Error details:", error);
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error("GitHub Sign In Error:", error);
      toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setIsGitHubLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signInData, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: callbackUrl,
    });

    if (error) {
      toast.error(
        error.message || "লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      );
    } else {
      toast.success("লগইন সফল হয়েছে!");
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-7 px-4 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">সাইন ইন</h1>
        <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      </div>
      <Form
        className="flex w-96 flex-col gap-4 bg-white  p-5 rounded-2xl border border-[#cacbce]"
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>ইমেল</Label>
          <Input placeholder="আপনার ইমেল লিখুন" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>
          <Input placeholder="আপনার পাসওয়ার্ড দিন" />
          <Description>
            অবশ্যই অন্তত ৮টি অক্ষরের হতে হবে, যার মধ্যে একটি বড় হাতের অক্ষর ও
            একটি সংখ্যা থাকতে হবে।
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2 ">
          <Button
            type="submit"
            className="btn w-full text-white bg-green-700"
            onClick={() => {
              toast.success("লগইন সফল হয়েছে!");
            }}
          >
            সাইন ইন
          </Button>
        </div>
        {/* Social Login Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        {/* Google Sign In Button */}

        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            isDisabled={isGoogleLoading}
            className="btn min-w-0 w-full items-center justify-center gap-2 overflow-hidden border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {isGoogleLoading ? (
              "সাইন ইন হচ্ছে..."
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google দিয়ে সাইন ইন
              </>
            )}
          </Button>

          <Button
            type="button"
            onClick={handleGitHubSignIn}
            isDisabled={isGitHubLoading}
            className="btn min-w-0 w-full items-center justify-center overflow-hidden gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {isGitHubLoading ? (
              "সাইন ইন হচ্ছে..."
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z" />
              </svg>
            )}
            GitHub দিয়ে সাইন ইন
          </Button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p>অ্যাকাউন্ট নেই?</p>
          <Link href="../sign-up" className="text-green-600">
            সাইন আপ করুন
          </Link>
        </div>
      </Form>

      <div className="flex items-center gap-1 text-gray-500">
        <span className="text-3xl">‹</span>
        <Link href="/">হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
};

export default SignInPage;

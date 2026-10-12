"use client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      password,
      confirmPassword,
    };

    // Password validation
    if (data.password !== data.confirmPassword) {
      setErrorMessage("দুটি পাসওয়ার্ড মিলছে না।");
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setIsLoading(true);

    try {
      const { data: signUpData, error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        const message =
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

        setErrorMessage(message);
        toast.error(message);
        return;
      }

      if (signUpData) {
        setSuccessMessage("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

        setPassword("");
        setConfirmPassword("");


        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-10 gap-7">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <Form
        className="w-full max-w-96 bg-white p-5 rounded-2xl border border-[#cacbce]"
        onSubmit={onSubmit}
      >
        <Fieldset>
          <Fieldset.Legend>প্রোফাইল</Fieldset.Legend>
          <Description>আপনার প্রোফাইলের তথ্য আপডেট করুন।</Description>
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>নাম</Label>
              <Input placeholder="আপনার নাম" />
              <FieldError />
            </TextField>

            <TextField isRequired name="email" type="email">
              <Label>ইমেল</Label>
              <Input placeholder="আপনার ইমেল লিখুন" />
              <FieldError />
            </TextField>

            {/* Password */}
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
              className="w-full max-w-700"
            >
              <Label>পাসওয়ার্ড</Label>
              <InputGroup>
                <InputGroup.Input
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  className="w-full max-w-70"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup.Suffix className="pe-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <Description>
                অবশ্যই অন্তত ৮টি অক্ষরের হতে হবে, যার মধ্যে একটি বড় হাতের অক্ষর
                ও একটি সংখ্যা থাকতে হবে।
              </Description>
              <FieldError />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              validate={(value) => {
                if (!value) {
                  return "Please confirm your password";
                }

                if (value !== password) {
                  return "Passwords do not match";
                }

                return null;
              }}
            >
              <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <InputGroup>
                <InputGroup.Input
                  placeholder="আবার পাসওয়ার্ড দিন"
                  className="w-full max-w-70"
                  type={isVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputGroup.Suffix className="pe-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError />
            </TextField>
          </FieldGroup>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
          )}

          <Fieldset.Actions>
            <Button
              type="submit"
              className="btn w-full bg-green-700 text-white"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>

      <div className="flex items-center gap-1 text-gray-500">
        <span className="text-3xl">‹</span>
        <Link href="/">হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
};

export default SignUpPage;

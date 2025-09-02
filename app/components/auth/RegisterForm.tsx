"use client";

import { useState } from "react";
import OTPForm from "./OTPForm";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRequestOtpMutation } from "@/lib/redux/api/authApi";
import { useLanguage } from "@/context/language-provider";

export default function RegisterForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [requestOtp, { isLoading }] = useRequestOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await requestOtp({ email }).unwrap();
      setStep("otp");
    } catch {
      setError("Failed to send OTP. Try again.");
    }
  };

  if (step === "otp") {
    return <OTPForm fullName={fullName} email={email} password={password} />;
  }

  return (
    <div className="w-full max-w-lg p-8 rounded-xl bg-white shadow-lg">
      {/* Title & Subtitle */}
      <h2 className="text-2xl font-bold text-teal-600 text-center">{t("r_join")}</h2>
      <p className="text-gray-600 mb-6 text-center">{t("r_create")}</p>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center gap-2 border rounded px-3 border-gray-200">
          <User className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder={t("r_fullName")}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="flex-1 p-3 outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center gap-2 border rounded px-3 border-gray-200">
          <Mail className="text-gray-500 w-5 h-5" />
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 p-3 outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center gap-2 border rounded px-3 border-gray-200">
          <Lock className="text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1 p-3 outline-none text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : t("r_createAccount")}
        </button>
      </form>

      {/* Sign in link */}
      <div className="mt-4 text-center">
        <Link
          className="text-sm text-teal-600 cursor-pointer hover:underline"
          href={"/login"}
        >
          {t("r_haveAccount")}
        </Link>
      </div>
    </div>
  );
}

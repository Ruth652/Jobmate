"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useLoginMutation } from "@/lib/redux/api/authApi";
import { setCredentials } from "@/lib/redux/authSlice";
import { useDispatch } from "react-redux";
import { useLanguage } from "@/context/language-provider";

export default function LoginForm() {
  const { t } = useLanguage();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const data = await login({ email, password }).unwrap();

    dispatch(
      setCredentials({
        user: data.user,
        accessToken: data.user.access_token, // saves to Redux + localStorage
      })
    );

    window.location.href = "/"; 
  } catch (err) {
    setError("Login failed. Please check your credentials.");
  }
};
  return (
    <div className="w-full max-w-lg p-8 rounded-xl bg-white shadow-lg font-serif">
      {/* Title & Subtitle */}
      <h2 className="text-2xl font-bold text-teal-600 text-center">{t("l_welcome")}</h2>
      <p className="text-gray-600 mb-6 text-center">{t("l_subtitle")}</p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
          {isLoading ? t("l_signingIn") : t("l_signIn")}
        </button>
      </form>

      {/* Signup Link */}
      <div className="mt-4 text-center">
        <Link
          className="text-sm text-teal-600 cursor-pointer hover:underline"
          href={"/register"}
        >
          {t("l_noAccount")}
        </Link>
      </div>
    </div>
  );
}

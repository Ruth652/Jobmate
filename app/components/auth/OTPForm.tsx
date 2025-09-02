"use client";

import { useState } from "react";
import { useRegisterMutation } from "@/lib/redux/api/authApi";

export default function OTPForm({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser({ fullName, email, password, otp }).unwrap();
      window.location.href = "/login"; // redirect to login
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-white shadow-lg">
      <h2 className="text-2xl font-bold text-teal-600 text-center mb-2">
        Verify OTP
      </h2>
      <p className="text-gray-600 text-center mb-6 text-sm">
        We’ve sent an OTP to <span className="font-medium">{email}</span>. Please enter it below to complete your registration.
      </p>

      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center text-gray-700 text-lg"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Register"}
        </button>
      </form>
    </div>
  );
}

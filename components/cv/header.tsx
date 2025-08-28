"use client";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
export default function Header() {
  const [language, setLanguage] = useState<"EN" | "AM">("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AM" : "EN"));
  };

  return (
    <header className=" bg-teal-700  text-white p-4 flex items-center justify-between ">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-lg">
          JM
        </div>
        <div>
          <h1 className="text-xl font-bold">Job Mate</h1>
          <p className="text-sm">Your career buddy</p>
        </div>
      </div>
      <button
        onClick={toggleLanguage}
        className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        <div className="flex items-center gap-2"><FaGlobe size={12}/>{language}</div>
      </button>
    </header>
  );
}

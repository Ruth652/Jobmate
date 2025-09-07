"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Jaro } from "next/font/google";
import { useLanguage } from "@/providers/language-provider";
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const jaro = Jaro({
  subsets: ["latin"],
  weight: ["400"],
});

const NavBar = () => {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f6f6f6] shadow-md">
      <div className="flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <Link href="#home">
          <h1 className={`${jaro.className} 2xl:text-3xl text-2xl`}>
            <span className="font-jaro text-[#217C6A]">Job</span>Mate
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="#home">{t("home")}</Link>
          <Link href="#service">{t("service")}</Link>
          <p onClick={() => router.push("/login")} className="cursor-pointer">
            {t("login")}
          </p>
          <Button
            className="bg-[#2CA58D] text-white px-4"
            onClick={() => router.push("/register")}
          >
            {t("signUp")}
          </Button>
          <div
            className="flex items-center bg-white rounded-md shadow-md px-2 gap-1 py-1 cursor-pointer"
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
          >
            <Globe className="h-5 w-5 text-[#0F3A31]" />
            <p className="text-black font-bold text-sm">
              {language === "en" ? t("switchToAmharic") : "EN"}
            </p>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f6f6f6] shadow-md flex flex-col gap-3 px-4 pb-4">
          <Link href="#home" onClick={() => setIsOpen(false)}>
            {t("home")}
          </Link>
          <Link href="#service" onClick={() => setIsOpen(false)}>
            {t("service")}
          </Link>
          <Button
            className="bg-[#2CA58D] text-white px-4 w-1/3"
            onClick={() => {
              router.push("/login");
              setIsOpen(false);
            }}
          >
            {t("login")}
          </Button>

          <Button
            className="bg-[#2CA58D] text-white px-4 w-1/3"
            onClick={() => {
              router.push("/register");
              setIsOpen(false);
            }}
          >
            {t("signUp")}
          </Button>
          <div
            className="flex items-center bg-white rounded-md shadow-md px-2 gap-1 py-1 cursor-pointer w-1/3"
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
          >
            <Globe className="h-5 w-5 text-[#0F3A31]" />
            <p className="text-black font-bold text-sm">
              {language === "en" ? t("switchToAmharic") : "EN"}
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

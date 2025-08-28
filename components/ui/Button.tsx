"use client";

import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline"; 
}

export const Button: FC<ButtonProps> = ({ children, variant = "default", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";

  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

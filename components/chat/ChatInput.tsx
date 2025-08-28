"use client";
import React, { useState } from "react";
import { useChat } from "../context/ChatProvider";
import { FiSend } from "react-icons/fi"; 
export default function ChatInput() {
  const [input, setInput] = useState("");
  const { addMessage } = useChat();

  const handleSend = () => {
  if (!input.trim()) return;
    addMessage({ text: input.trim(), sender: "user" });
    addMessage({
      text: "This is a placeholder AI response.",
      sender: "ai",
    });

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();    }  };

  return (
    <div className="flex items-center space-x-2 p-4 border-t border-gray-300">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
     <button
             onClick={handleSend}
             className="p-3 bg-gray-600 text-white rounded hover:bg-green-600 transition"
           >
             <FiSend size={20} />
           </button>
    </div>
  );
}

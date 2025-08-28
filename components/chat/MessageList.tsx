"use client";

import React from "react";
import { useChat, ChatMessage } from "../context/ChatProvider";

export default function MessageList() {
  const { messages } = useChat();

  return (
    <div className="flex flex-col space-y-2 p-4 overflow-y-auto max-h-[500px]">
      {messages.map((msg: ChatMessage) => (
        <div
          key={msg.id}
          className={`p-2 rounded  break-words ${
            msg.sender === "user"
              ? "bg-green-200 text-black self-end"
              : "bg-gray-200 text-black self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}

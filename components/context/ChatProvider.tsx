"use client"; 

import { createContext, useContext, useState, ReactNode } from "react";

export interface ChatMessage {
  id: string;        
  text: string;      
  sender: "user" | "ai"; 
  timestamp: number; 
}


interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
}


const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function addMessage(message: Omit<ChatMessage, "id" | "timestamp">) {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...message,
    };
    setMessages((prev) => [...prev, newMessage]);
  }
  function clearMessages() {
    setMessages([]);
  }

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

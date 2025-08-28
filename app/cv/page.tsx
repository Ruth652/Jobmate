"use client";
import ChatWindow from "@/components/chat/ChatWindow";
import { useEffect } from "react";
import { useChat } from "@/components/context/ChatProvider"; 
import Header from '@/components/cv/header'
export default function CVPage() {
  const { addMessage } = useChat();

  useEffect(() => {
    addMessage({
      text: "Great! I'd be happy to help you with your CV. You can upload your current CV or describe your background below, and I'll provide feedback.",
      sender: "ai",
    });
  }, []);

  return (
    <div className="flex flex-col h-full">   
      <Header/>   
      <ChatWindow/>
      {/* <ChatFooter/> */}
    </div>
  );
}

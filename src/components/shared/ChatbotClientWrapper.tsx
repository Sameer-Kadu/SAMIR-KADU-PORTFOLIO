"use client";
import dynamic from "next/dynamic";

const LazyChatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotClientWrapper() {
  return <LazyChatbot />;
}
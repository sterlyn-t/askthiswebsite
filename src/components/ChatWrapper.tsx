"use client";
import { useChat } from "ai/react";
import React from "react";

const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const { messages, handleInputChange, handleSubmit, input } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
  });
  return (
    <div className="relative min-h-full bg-zinc-900 flex flex-col justify-between gap-2 divide-y divide-zinc-700">
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        {JSON.stringify(messages)}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={input} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWrapper;

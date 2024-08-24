"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { Button } from "@nextui-org/react";
import { BotMessageSquare, ClipboardCheck, ClipboardPaste } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [url, setUrl] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [pasteClicked, setPasteClicked] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleSubmit = async () => {
    if (url && baseUrl) {
      router.push(baseUrl + "/" + url);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      setPasteClicked(true);
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setTimeout(() => {
        setPasteClicked(false);
      }, 500);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };
  return (
    <>
      <NavBar />
      <main className="flex min-h-[80vh] flex-col items-center justify-between p-8">
        <div className="max-w-5xl items-center font-mono text-2xl font-bold gap-16 flex flex-col">
          <div>
            <h2>
              Use AI to chat with any webpage today. Paste in your desired URL
              and click Start Chatting.
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="gap-8 flex justify-center items-center flex-col w-full"
          >
            <input
              autoFocus
              className="text-white rounded-md w-full md:w-3/4 lg:w-1/2 h-10 text-lg p-2"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex gap-4">
              <Button
                size="sm"
                className="border border-border bg-gray-500"
                onClick={handlePasteFromClipboard}
              >
                {pasteClicked ? <ClipboardCheck /> : <ClipboardPaste />}
                Paste URL
              </Button>
              <Button
                size="sm"
                className="border border-border bg-blue-500"
                onClick={handleSubmit}
              >
                <BotMessageSquare />
                Start Chatting
              </Button>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none"></div>
      </main>
    </>
  );
}

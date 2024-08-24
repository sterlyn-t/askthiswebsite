"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { Button } from "@nextui-org/react";
import { BotMessageSquare, ClipboardCheck, ClipboardPaste } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeams";
import { Cover } from "@/components/Cover";

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
      <main className="z-10 flex max-h-[60vh] flex-col items-center">
        <div className="max-w-5xl items-center text-2xl font-bold gap-8 flex flex-col">
          <div>
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Use AI to chat with any webpage today. Paste any URL to <br />
              <Cover>start chatting</Cover>
            </h1>
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
                Start Chat
              </Button>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none"></div>
      </main>
    </>
  );
}

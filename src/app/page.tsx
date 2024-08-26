"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { Button } from "@nextui-org/react";
import {
  BotMessageSquare,
  ClipboardCheck,
  ClipboardPaste,
  Loader,
  Redo,
} from "lucide-react";
import { Cover } from "@/components/Cover";
import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeams";
import { PlaceholdersAndVanishInput } from "@/components/PlaceholdersVanishInput";

export default function Home() {
  const router = useRouter();

  const [url, setUrl] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [pasteClicked, setPasteClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleSubmit = async () => {
    if (url && baseUrl) {
      setLoading(true);
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
    <BackgroundBeamsWithCollision>
      <NavBar />
      <main className="z-10 flex flex-col items-center h-screen  mt-[10vh] md:mt-[24vh] sm:mt-[8vh]">
        <div className="max-w-5xl items-center text-2xl gap-8 flex flex-col">
          <div className="relative">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Use AI to chat about any webpage today. Paste any URL to <br />
              <Cover>start chatting.</Cover>
            </h1>
            <Redo
              className="text-zinc-600 rotate-90 absolute right-44 lg:block hidden"
              size="48"
            />
          </div>
          <div className="gap-8 flex justify-center items-center flex-col w-full">
            <PlaceholdersAndVanishInput
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              onSubmit={handleSubmit}
              placeholders={[
                "https://en.wikipedia.org/wiki/Inter_Miami_CF",
                "https://edition.cnn.com/markets",
                "https://medium.com/kredibel/next-js-pragmatis-streaming-36d7d600f7f4",
              ]}
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
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <BotMessageSquare />
                )}
                {loading && <p>Loading...</p>}
                {!loading && <p>Start Chat</p>}
              </Button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none"></div>
      </main>
    </BackgroundBeamsWithCollision>
  );
}

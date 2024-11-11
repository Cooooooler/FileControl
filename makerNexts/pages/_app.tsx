import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontMono, fontSans } from "@/config/fonts";

import "@/styles/globals.css";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "@nextui-org/react";

import EventEmitter from "@/messages_center";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const loadingId = useId();

  useEffect(() => {
    EventEmitter.on("StartWaiting", () => {
      //  向页面添加全局loading
      setIsLoading(true);
    });
    EventEmitter.on("StopWaiting", () => {
      //  向页面移除全局loading
      setIsLoading(false);
    });
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <Component {...pageProps} />
        {isLoading &&
          createPortal(
            <div className="flex overflow-hidden w-screen h-screen fixed inset-0 z-[9999] items-center justify-center bg-background bg-opacity-30 backdrop-blur-md">
              <Spinner color="warning" label="Loading..." />
            </div>,
            document.body,
            loadingId,
          )}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

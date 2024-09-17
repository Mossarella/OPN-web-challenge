import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

import { inter, lato, poppins } from "@/public/fonts/FontProperty";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import LoadingPage from "./loading";
import Title from "@/components/Main/Title/Title";
import NavBar from "@/components/Nav/NavBar";

export const metadata: Metadata = {
  title: "Omise Tamboon React",
  description: "Web challenge",
  icons: {
    icon: "images/omise.png",
  },
  creator: "Mossarelladev",
  authors: { name: "Mossarelladev", url: "https://mossarelladev.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link
          rel="shortcut icon"
          href="/images/icon.ico"
        />

        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:url"
          content="https://mossarelladev.com"
        />
        <meta
          property="og:title"
          content="MossarellaDev | Web Portfolio"
        />
        <meta
          property="og:description"
          content="Creative frontend developer passionate about crafting visually stunning websites and digital experiences. Giddy up, let's hit the trail!
"
        />
        <meta
          property="og:image"
          content="https://mossarelladev.com/images/cover.png"
        />

        <meta
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:url"
          content="https://mossarelladev.com"
        />
        <meta
          property="twitter:title"
          content="MossarellaDev | Web Portfolio"
        />
        <meta
          property="twitter:description"
          content="Creative frontend developer passionate about crafting visually stunning websites and digital experiences. Giddy up, let's hit the trail!
"
        />
        <meta
          property="twitter:image"
          content="https://mossarelladev.com/images/cover.png"
        /> */}
      </head>
      <body
        className={cn(
          inter.variable,
          lato.variable,
          poppins.variable,
          "w-full"
        )}
      >
        <nav className="flex flex-col items-center">
          <NavBar></NavBar>
        </nav>
        <main className="flex flex-col w-full flex-1 items-center min-h-[calc(100vh-108px)] ">
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </main>
        <footer className="flex flex-col w-full flex-1 items-center">
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}

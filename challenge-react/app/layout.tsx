import type { Metadata } from "next";
import "./globals.css";
import joiner from "classnames";
import { inter, lato } from "@/public/fonts/FontProperty";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import LoadingPage from "./loading";

export const metadata: Metadata = {
  title: "Web dev challenge",
  description: "This is getting exciting",
  icons: {
    icon: "images/MainLogo.svg",
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
      <body className={joiner(inter.variable, lato.variable, "maxSection")}>
        <nav>{/* <Nav></Nav> */}</nav>
        <main className="flex flex-col w-full flex-1">
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}

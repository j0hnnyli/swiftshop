import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartContextProvider } from "@/context/CartContext";
import DarkProvider from "@/components/DarkProvider";
import Header from "@/components/Header";
import MediaHeader from "@/components/mediacomponents/MediaHeader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwiftShop",
  description: "Shop with Swift",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DarkProvider>
          <CartContextProvider>
            <Header />
            <MediaHeader />
            <main className="mt-5 lg:mt-24">{children}</main>
          </CartContextProvider>
        </DarkProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaxHub – Lacrosse Analytics",
  description: "Rankings, scores, recruiting, and deep stats for every NCAA lacrosse program.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaxHub – Lacrosse Analytics",
  description: "Comprehensive lacrosse analytics, rankings, and recruiting data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

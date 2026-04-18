import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Book Finder",
  description: "Search for books and save your personal reading list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

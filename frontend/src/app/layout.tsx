import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "@styles/globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Point",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.className} antialiased`}>{children}</body>
    </html>
  );
}

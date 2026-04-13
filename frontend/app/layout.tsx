import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tensor Wealth",
  description: "Track your wealth, analyze your portfolio, and manage your assets from one dashboard.",
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

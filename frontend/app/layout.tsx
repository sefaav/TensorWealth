import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TensorWealth | Authentication",
  description: "Authentication page with login and register.",
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

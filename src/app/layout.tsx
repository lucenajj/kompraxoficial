import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KompraX - Obian Sistemas",
  icons: {
    icon: "/img/favicon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

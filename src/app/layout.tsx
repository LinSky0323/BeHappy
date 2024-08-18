import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";



// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be Happy",
  description: "Hope you always be happy !",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>

          <link rel="icon" href="/motorcycle.png" />

        </head>
      <body >
          {children}
      </body>
    </html>
  );
}

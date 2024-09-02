import type { Metadata } from "next";
import { Inter,Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'

const myFont = localFont({ src: [
  {path:"./SourceHanSerifTC-Bold.otf",weight:"700",},{path:"./SourceHanSerifTC-Medium.otf",weight:"500",},{path:"./SourceHanSerifTC-Regular.otf",weight:"400",}
],fallback:['Noto Sans TC', 'sans-serif'],variable:"--font-myfont" })
const notoSans = Noto_Sans_TC({ weight: ['400', '700'], subsets: ["latin"]})
const inter = Inter({ subsets: ["latin"] });

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
      <body className={myFont.className}>
          {children}
      </body>
    </html>
  );
}

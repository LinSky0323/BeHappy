"use client"

import LeftBar from "@/component/bar/leftbar/leftbar";
import { Agree } from "@/lib/agree";
import { Suspense } from "react";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    Agree()

    return ( 
                <>
                <LeftBar/>
                {children}
                </>

    );
  }
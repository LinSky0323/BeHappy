"use client"

import LeftBar from "@/component/bar/leftbar/leftbar";
import { TranscationProviders } from "@/lib/store/porvider";


export default function MyBookingItemLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const userProfileList = [{name:"預約清單",id:"/"},{name:"交易記錄",id:"record"}]
    return ( 
      <TranscationProviders>
            <LeftBar list = {userProfileList} path = "mybookingitem"/>
            {children}
      </TranscationProviders>

    );
  }
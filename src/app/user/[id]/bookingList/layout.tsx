"use client"

import LeftBar from "@/component/bar/leftbar/leftbar";
import { BookingListProviders } from "@/lib/store/porvider";


export default function MyBookingListLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const userProfileList = [{name:"預約管理",id:""},{name:"預約記錄",id:"record"}]
    return ( 
      <BookingListProviders>
            <LeftBar list = {userProfileList} path = "bookingList"/>
            {children}
      </BookingListProviders>

    );
  }
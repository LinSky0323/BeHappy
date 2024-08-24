"use client"

import LeftBar from "@/component/bar/leftbar/leftbar";


export default function MyBookingListLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const userProfileList = [{name:"預約清單",id:""},{name:"交易記錄",id:"record"}]
    return ( 
      <>
            <LeftBar list = {userProfileList} path = "mybookingitem"/>
            {children}
      </>

    );
  }
"use client"

import LeftBar from "@/component/bar/leftbar/leftbar";


export default function UserProfileLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const userProfileList = [{name:"個人資料",id:"/"},{name:"帳戶資訊",id:"acount"}]
    return ( 
      <>
            <LeftBar list = {userProfileList} path = "userProfile"/>
            {children}
      </>

    );
  }
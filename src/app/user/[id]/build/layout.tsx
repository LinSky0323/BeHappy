"use client"

import LeftBar from "@/component/bar/leftbar/leftbar";
import { UserBuildProviders } from "@/lib/store/porvider";
import { useRouter } from "next/navigation";


export default function BuildLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const route = useRouter()
  const level = localStorage.getItem("level") as string
        if(level!== "1"){
          route.back()
            return
        }
  const buildLeftList = [{name:"網頁主題",id:"buildtitle"},{name:"簡介",id:"buildintroduce"},{name:"產品展示",id:"builddisplay"},{name:"預約項目",id:"builditem"},{name:"可預約時間",id:"buildtime"},{name:"網址",id:"buildid"},{name:"完成",id:"buildcomplete"}]
    return ( 
      <UserBuildProviders>
                <LeftBar list = {buildLeftList} path = "build"/>
                {children}
      </UserBuildProviders>

    );
  }
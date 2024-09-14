"use client"
import styles from "./layout.module.css"
import LeftBar from "@/component/bar/leftbar/leftbar";
import { BookingListProviders } from "@/lib/store/porvider";
import { useRouter } from "next/navigation";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from "next/image";

export default function MyBookingListLayout({children,record}: Readonly<{children: React.ReactNode,record:React.ReactNode}>) {
  const w = window.innerWidth
  const route = useRouter()
  const level = localStorage.getItem("level") as string
        if(level!== "1"){
          route.back()
            return
        }
    const userProfileList = [{name:"預約管理",id:"bookinglist_list"},{name:"預約記錄",id:"bookinglist_record"}]
    return ( 
      <BookingListProviders>
            <LeftBar list = {userProfileList} path = "bookingList"/>
            <Parallax pages={w>800?2:4} style={{overflow:"auto"}} id="scrollContainer">
              
              <ParallaxLayer data-index = {0} id="bookinglist_list" offset={0} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {children}
              </ParallaxLayer>
              <ParallaxLayer offset={w>800?0:1} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
              </ParallaxLayer>
              <ParallaxLayer data-index = {1} id="bookinglist_record" offset={w>800?1:2} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {record}
              </ParallaxLayer>
            </Parallax>

      </BookingListProviders>

    );
  }
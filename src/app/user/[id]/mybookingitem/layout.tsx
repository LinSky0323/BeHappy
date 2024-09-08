"use client"
import styles from "./layout.module.css"
import LeftBar from "@/component/bar/leftbar/leftbar";
import { TranscationProviders } from "@/lib/store/porvider";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from "next/image";

export default function MyBookingItemLayout({children,record}: Readonly<{children: React.ReactNode,record:React.ReactNode}>) {
    const userProfileList = [{name:"預約清單",id:"mybookingitem_item"},{name:"交易記錄",id:"mybookingitem_record"}]
    return ( 
      <TranscationProviders>

        <Parallax pages={2} style={{overflow:"auto"}} id="scrollContainer">
          
          <ParallaxLayer  offset={0} speed={-1.05} style={{display:"flex",justifyContent:"flex-start",zIndex:"11" ,width:"100px"}}>
            <LeftBar list = {userProfileList} path = "mybookingitem"/>
          </ParallaxLayer>
        
          <ParallaxLayer id="mybookingitem_item" offset={0} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
            {children}
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0.6} >
            <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="mybookingitem_record" offset={1} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
            {record}
          </ParallaxLayer>
        </Parallax>

            
            
      </TranscationProviders>

    );
  }
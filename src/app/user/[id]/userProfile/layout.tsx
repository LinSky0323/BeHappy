"use client"
import styles from "./layout.module.css"
import LeftBar from "@/component/bar/leftbar/leftbar";
import { ProfileProviders } from "@/lib/store/porvider";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from "next/image";


export default function UserProfileLayout({children,acount}: Readonly<{children: React.ReactNode,acount:React.ReactNode}>) {
    const userProfileList = [{name:"個人資料",id:"userProfile_profile"},{name:"帳戶資訊",id:"userProfile_acount"}]
    return ( 
      <ProfileProviders>
          
            <Parallax pages={2} style={{overflow:"auto"}} id="scrollContainer">
              
              <ParallaxLayer offset={0} speed={-1.05} style={{display:"flex",justifyContent:"flex-start",zIndex:"11",width:"100px"}}>
                <LeftBar list = {userProfileList} path = "userProfile"/>
              </ParallaxLayer>


              <ParallaxLayer id="userProfile_profile" offset={0} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {children}
              </ParallaxLayer>
              <ParallaxLayer offset={0} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
              </ParallaxLayer>
              <ParallaxLayer id="userProfile_acount" offset={1} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {acount}
              </ParallaxLayer>
            </Parallax>
            

      </ProfileProviders>

    );
  }
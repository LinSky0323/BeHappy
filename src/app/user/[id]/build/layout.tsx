"use client"
import styles from "./layout.module.css"
import LeftBar from "@/component/bar/leftbar/leftbar";
import { UserBuildProviders } from "@/lib/store/porvider";
import { useRouter } from "next/navigation";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from "next/image";

export default function BuildLayout({children,buildtitle,buildintroduce,builddisplay,builditem,buildtime,buildid,buildcomplete}: Readonly<{children: React.ReactNode,buildtitle: React.ReactNode,buildintroduce: React.ReactNode,builddisplay: React.ReactNode,builditem: React.ReactNode,buildtime: React.ReactNode,buildid: React.ReactNode,buildcomplete: React.ReactNode}>) {
  const w = window.innerWidth
  const route = useRouter()
  const level = localStorage.getItem("level") as string
        if(level!== "1"){
          route.back()
            return
        }
  const buildLeftList = [{name:"網頁主題",id:"build_title"},{name:"簡介",id:"build_introduce"},{name:"產品展示",id:"build_display"},{name:"預約項目",id:"build_item"},{name:"可預約時間",id:"build_time"},{name:"網址",id:"build_id"},{name:"完成",id:"build_complete"}]
    return ( 
      <UserBuildProviders>
         <Parallax pages={w>800?8:11} style={{overflow:"auto"}} id="scrollContainer">
          
          <ParallaxLayer offset={0} speed={-1.05} style={{display:"flex",justifyContent:"flex-start",zIndex:"11",width:"0px"}}>
            <LeftBar list = {buildLeftList} path = "build"/>
          </ParallaxLayer>


          <ParallaxLayer id="build_home" offset={0} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {children}
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_title" offset={1} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildtitle}
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_introduce" offset={2} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildintroduce}
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_display" offset={3} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {builddisplay}
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?3:4} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_item" offset={w>800?4:5} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {builditem}
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?4:6} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_time" offset={w>800?5:7} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildtime}
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?6:8} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_id" offset={w>800?6:9} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildid}
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?8:9} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer id="build_complete" offset={w>800?7:10} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildcomplete}
          </ParallaxLayer>

         </Parallax>


      </UserBuildProviders>

    );
  }
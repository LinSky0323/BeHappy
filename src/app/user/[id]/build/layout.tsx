"use client"
import styles from "./layout.module.css"
import LeftBar from "@/component/bar/leftbar/leftbar";
import { UserBuildProviders } from "@/lib/store/porvider";
import { useRouter } from "next/navigation";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from "next/image";
import { NextButton } from "@/component/button/nextButton/page";

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
        <LeftBar list = {buildLeftList} path = "build"/>
         <Parallax pages={w>800?8:11} style={{overflow:"auto"}} id="scrollContainer">
          
          <ParallaxLayer id="build_home" offset={0} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {children}
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={0} id="build_title" offset={1} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildtitle}
              <div className={styles.arrow} >
                <NextButton url = "build_introduce"/>
              </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={1} id="build_introduce" offset={2} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildintroduce}
              <div className={styles.arrow} >
                <NextButton url = "build_display"/>
              </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={2} id="build_display" offset={3} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {builddisplay}
              <div className={styles.arrow} >
                <NextButton url = "build_item"/>
              </div>
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?3:4} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={3} id="build_item" offset={w>800?4:5} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {builditem}
              <div className={styles.arrow} >
                <NextButton url = "build_time"/>
              </div>
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?4:6} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={4} id="build_time" offset={w>800?5:7} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildtime}
              <div className={styles.arrow} >
                <NextButton url = "build_id"/>
              </div>
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?6:8} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={5} id="build_id" offset={w>800?6:9} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildid}
              <div className={styles.arrow} >
                <NextButton url = "build_complete"/>
              </div>
          </ParallaxLayer>

          <ParallaxLayer offset={w>800?8:9} speed={0.6} >
                <div className={styles.starriver}><Image alt="starriver" src="/starriver.png" fill sizes="100%" style={{objectFit:"cover",zIndex:"3"}}/></div>
          </ParallaxLayer>

          <ParallaxLayer data-index={6} id="build_complete" offset={w>800?7:10} speed={0} style={{display:"flex",justifyContent:"center",zIndex:"10"}}>
              {buildcomplete}
          </ParallaxLayer>

         </Parallax>


      </UserBuildProviders>

    );
  }
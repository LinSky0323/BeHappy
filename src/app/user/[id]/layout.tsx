"use client"
import Header from "@/component/header/header";
import styles from "./layout.module.css"
import { Agree } from "@/lib/agree";
import {   useEffect, useState } from "react";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import RemindMask from "@/component/mask/remindMask/page";
import {useSpring,animated } from "@react-spring/web"


const guestNavList = [{name:"個人資料",id:"userProfile",img:"/profile.png"},{name:"我的預約",id:"mybookingitem",img:"/bookingItem.png"},{name:"訊息",id:"message",img:"/message.png"}]
const tradeNavlist = [{name:"個人資料",id:"userProfile",img:"/profile.png"},{name:"建立網頁",id:"build",img:"/build.png"},{name:"訂單確認",id:"bookingList",img:"/schedule.png"},{name:"訊息",id:"message",img:"/message.png"}]
const from = ()=>({x:0})
const to = ()=>({x:38})
export default function UserLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const route = useRouter()
    const url = useParams()
    const path = usePathname()
    const [ok,setok] = useState(false)
    const [identity,setIdentity] = useState(1)
    const [openRemind,setOpenRemind] = useState<string|boolean>(false)
    const [prop,api] = useSpring(()=>({
        from
    }))
    useEffect(()=>{
        setok(Agree())
        const i = sessionStorage.getItem("identity")
        if(i){
            setIdentity(Number(i))
            if(Number(i)===1){
                api.start(()=>from())
            }
            else if(Number(i)===2){
                api.start(()=>to())
            }
        }

    },[])

    if(!ok)return

    const clickguest = ()=>{
        sessionStorage.setItem("identity","1")
        setIdentity(1)
        api.start(()=>from())
        route.push(`/user/${url.id}`)
    }
    const clicktrade = ()=>{
        const level = localStorage.getItem("level") as string
        if(level!== "1"){
            setOpenRemind(true)
            return
        }
        sessionStorage.setItem("identity","2")
        api.start(()=>to())
        setIdentity(2)
        route.push(`/user/${url.id}`)
    }
    return (
        <>
            <Header title="喜悦網頁製作" username="1" navList={ path.split("/").length===3?[]: identity===1?guestNavList:tradeNavlist}/>
            <div className={styles.identity}>
                <animated.div className={styles.itemMask} style={{x:prop.x}}> </animated.div>
                <animated.span className={`${styles.span} ${identity===1 && styles.choose}`}  onClick={clickguest}>顧客</animated.span> | 
                <animated.span className={`${styles.span} ${identity===2 && styles.choose}`}  onClick={clicktrade}>業者</animated.span>
            </div>
            {openRemind && <RemindMask setOpenRemind={setOpenRemind} message="您未升級會員，此功能無法使用" url={`/user/${url.id}/userProfile/levelup`} urlMessage="點此前往付費頁面"/>}
            <section className={styles.container} key={identity}>
                {children}     
            </section>  
        </>     

    );
  }
"use client"
import Header from "@/component/header/header";
import { UserBuildProviders } from "@/lib/store/porvider";
import styles from "./layout.module.css"
import { Agree } from "@/lib/agree";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { createContext } from "react";
import { useParams, useRouter } from "next/navigation";

export const IdentityContext = createContext({})

export const guestNavList = [{name:"個人資料",id:"userProfile/profile",img:"/profile.png"},{name:"我的預約",id:"mybookingitem",img:"/bookingItem.png"},{name:"訊息",id:"message",img:"/message.png"}]
export const tradeNavlist = [{name:"個人資料",id:"userProfile/profile",img:"/profile.png"},{name:"建立網頁",id:"build",img:"/build.png"},{name:"訂單確認",id:"bookingList",img:"/schedule.png"},{name:"訊息",id:"message",img:"/message.png"}]


export default function UserLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const route = useRouter()
    const url = useParams()
    const [ok,setok] = useState(false)
    const [identity,setIdentity] = useState(1)
    useEffect(()=>{
        setok(Agree())
        const i = sessionStorage.getItem("identity")
        if(i){
            setIdentity(Number(i))
        }
    },[])

    if(!ok)return

    const clickguest = ()=>{
        sessionStorage.setItem("identity","1")
        setIdentity(1)
        route.push(`/user/${url.id}`)
    }
    const clicktrade = ()=>{
        sessionStorage.setItem("identity","2")
        setIdentity(2)
        route.push(`/user/${url.id}`)
    }
    return (
        <>
            <Header title="喜悅網頁製作" username="鎧" navList={identity===1?guestNavList:tradeNavlist}/>
            <div className={styles.identity}><span className={`${styles.span} ${identity===1 && styles.choose}`} onClick={clickguest}>顧客</span> | <span className={`${styles.span} ${identity===2 && styles.choose}`} onClick={clicktrade}>業者</span></div>
            <section className={styles.container}>
            <IdentityContext.Provider value={{identity,setIdentity}}>
                {children}
            </IdentityContext.Provider>
            </section>  
        </>     

    );
  }
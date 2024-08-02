"use client"
import { useRouter } from "next/navigation"
import styles from "./sign.module.css"
import { useState } from "react"

export default function Sign(){
    const [isLogin,setIsLogin] = useState(false)
    const route = useRouter()
    const clickSign = ()=>{
        route.push("/sign")
    }
    const clickLogin = ()=>{
        route.push("/login")
    }
    const clickLogout = ()=>{
        route.push("/logout")
    }
    return(
        <div className={styles.container}>
            <div onClick={isLogin?undefined:clickSign} className={styles.item}>
                {isLogin ? "" : "註冊"}
            </div>
            <div onClick={isLogin?clickLogout:clickLogin} className={styles.item}>
                {isLogin ? "登出" : "登入"}
            </div>
        </div>
    )
}
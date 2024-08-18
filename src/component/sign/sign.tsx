"use client"
import { usePathname, useRouter } from "next/navigation"
import styles from "./sign.module.css"
import { useEffect, useLayoutEffect, useState } from "react"
import SL from "../logMask/page"
import { checkAuth } from "@/lib/firebase/firaAuth"



export default function Sign(){
    const [isLogin,setIsLogin] = useState(0)
    const [slwindow,setSlwindow] = useState(false)
    const route = useRouter()
    const pathname = usePathname()

    useLayoutEffect(()=>{
        checkAuth().then((res:any)=>{
            setIsLogin(1)
            localStorage.setItem("user",res.uid)
        }).catch((error)=>{
            setIsLogin(2)
            console.log(error)})

    },[])
    const click = ()=>{
        setSlwindow(true)
    }
    const clickPerson = ()=>{
        route.push("/user/"+localStorage.getItem("uid"))
    }
    if(!isLogin)return
    return(
        <div className={styles.container}>
            <div onClick={click} className={styles.item}>
                {(isLogin===1) &&<span style={{marginRight:"10px"}} onClick = {clickPerson}>個人頁面</span>}
                {isLogin===1 ? "登出" : "註冊/登入"}
            </div>
            {slwindow && <SL isLogin = {isLogin} setSlwindow = {setSlwindow} setIsLogin = {setIsLogin}/>}
        </div>
    )
}
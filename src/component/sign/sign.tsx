"use client"
import { usePathname, useRouter } from "next/navigation"
import styles from "./sign.module.css"
import {  useLayoutEffect, useState } from "react"
import SL from "../mask/logMask/page"
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
    const clickPerson = (e:React.MouseEvent<HTMLSpanElement>)=>{
        e.stopPropagation()
        route.push("/user/"+localStorage.getItem("uid"))
    }
    if(!isLogin)return
    return(
        <div className={styles.container}>
            <div onClick={click} className={styles.item} id="SLBtn">
                {(isLogin===1) &&<span className={styles.items} style={{marginRight:"10px"}} onClick = {(e)=>clickPerson(e)}>個人頁面</span>}
                {isLogin===1 ?<span className={styles.items}>登出</span>: <span className={styles.items}>註冊/登入</span>}
            </div>
            {slwindow && <SL isLogin = {isLogin} setSlwindow = {setSlwindow} setIsLogin = {setIsLogin}/>}
        </div>
    )
}
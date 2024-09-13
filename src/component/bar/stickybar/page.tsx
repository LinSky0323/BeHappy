'use client'
import Sign from "@/component/sign/sign"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { checkAuth } from "@/lib/firebase/firaAuth"
import SL from "@/component/mask/logMask/page"

export default function StickyBar(){

    const [isLogin,setIsLogin] = useState(0)
    const [slwindow,setSlwindow] = useState(false)
    const route = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
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
        <>
        {slwindow && <SL isLogin = {isLogin} setSlwindow = {setSlwindow} setIsLogin = {setIsLogin}/>}
       
        {isLogin===1 ?
        <>
        <div className={`${styles.container} ${styles.c1}`} onClick={clickPerson}>
            個人頁面
        </div>
        <div className={`${styles.container} ${styles.c2}`} onClick={click} >
            登出
        </div>
        </>
        :
        <div className={styles.container} onClick={click} id="SLBtn">
            <div className={styles.bling}></div>
            註冊/登入
        </div>
        }
        
        </>
    )
}
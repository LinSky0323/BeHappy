"use client"

import { StopPropogation } from "@/lib/stopPropagation"
import styles from "./page.module.css"
import { SetStateAction } from "react"
import { useRouter } from "next/navigation"

export default function RemindMask({setOpenRemind,message,url,urlMessage}:{setOpenRemind:React.Dispatch<SetStateAction<string|boolean>>,message:string|boolean,url?:string,urlMessage?:string}){
    const route = useRouter()
    const handleClick = ()=>{
        setOpenRemind(false)
    }
    const clickPay = ()=>{
        if(url){
            setOpenRemind(false)
            route.push(url)
        }
    }
    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.container} onClick={StopPropogation}>
                <div>{message}</div>
                {urlMessage && <div className={styles.url} onClick={clickPay}>{urlMessage}</div>}
                <button className={styles.button} onClick={handleClick}>返回上一個頁面</button>
            </div>
        </div>
    )
}
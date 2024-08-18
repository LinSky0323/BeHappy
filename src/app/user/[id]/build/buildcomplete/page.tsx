"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"


export default function BuildComplete(){
    const remind = useChangeRemind()
    const handleClick = ()=>{
        const url = document.querySelector("#url") as HTMLDivElement
        navigator.clipboard.writeText(url.innerText).then(()=>{
            remind.setRemind("複製成功")
        }).catch(()=>{
            remind.setRemind("複製失敗")
        })
    }
    const protocol = window.location.protocol
    const host = window.location.host
    const url = protocol+host+"/"+localStorage.getItem("uid")
    return(
        <div className={styles.container}>
            <div className={styles.title}>恭喜你成功編輯完您的網頁！</div>
            <div className={styles.title2}>已下是您的網址：</div>
            <div className={styles.urlContainer}>
                <div className={styles.url} id="url">{url}</div><div onClick={handleClick}><Image src="/ctrlc.png"  alt="複製" width={30} height={30} style={{marginTop:"30px",cursor:"pointer"}}/></div>
            </div>
            <div className={styles.remind}>{remind.state}</div>
            
        </div>
    )
}
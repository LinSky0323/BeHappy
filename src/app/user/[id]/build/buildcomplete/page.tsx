"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, selectTimeList } from "@/lib/store/features/userBuildSlices"
import { useEffect, useState } from "react"
import { getListData, getTimeData } from "@/lib/firebase/firestore"


export default function BuildComplete(){
    const uid = localStorage.getItem("uid") as string
    const timelist = useUserBuildSelector(selectTimeList)
    const buildList:any = useUserBuildSelector(selectBuildList)
    const [state,setState] = useState((buildList.titleName && buildList.writerName && buildList.introduceImage && buildList.introduceContent.length && buildList.bookingList.length && buildList.displayList.length && Object.keys(timelist).length)?true:false)
    const remind = useChangeRemind()
    const handleClick = ()=>{
        const url = document.querySelector("#url") as HTMLDivElement
        navigator.clipboard.writeText(url.innerText).then(()=>{
            remind.setRemind("複製成功")
        }).catch(()=>{
            remind.setRemind("複製失敗")
        })
    }
    useEffect(()=>{
        if(!state){
            getListData(uid).then((res:any)=>{
                if(res.titleName && res.writerName && res.introduceImage && res.introduceContent.length && res.bookingList.length && res.displayList.length){
                    setState(true)
                }
            })
            getTimeData(uid).then((res:any)=>{
                if(Object.keys(res).length){
                    setState(true)
                }
            })
        }
    },[])
    const protocol = window.location.protocol
    const host = window.location.host
    const url = protocol+host+"/"+localStorage.getItem("uid")
    return(
        <div className={styles.container}>
            <div className={styles.title}>{state?"恭喜你成功編輯完您的網頁！":"您還有資料尚未設定"}</div>
            {state && 
            <>
            <div className={styles.title2}>已下是您的網址：</div>
            <div className={styles.urlContainer}>
                <div className={styles.url} id="url">
                    {url}
                </div>
                <div className={styles.imgContainer} onClick={handleClick}><Image src="/ctrlc.png"  alt="複製" width={30} height={30} style={{marginTop:"30px",cursor:"pointer"}}/>
                </div>
            </div>
            </>}
            
            <div className={styles.remind}>{remind.state}</div>
            
        </div>
    )
}
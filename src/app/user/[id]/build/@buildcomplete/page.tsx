"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, selectTimeList } from "@/lib/store/features/userBuildSlices"
import { useEffect, useState } from "react"
import { getListData, getTimeData } from "@/lib/firebase/firestore"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"


export default function BuildComplete(){
    const uid = localStorage.getItem("uid") as string
    const [buildstate,setBuildState] = useState("")
    const [timestate,setTimeState] = useState(false)
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
        const db = getFirestore()
        const buildref = doc(db,uid,"listdb")
        const timeref = doc(db,uid,"timedb")
        const unsubscribe1 = onSnapshot(buildref,(snapshot)=>{
            if(snapshot.exists()){
                const res:any = snapshot.data()
                try{
                    if(res.titleName && res.writerName && res.paramsId && res.introduceImage && res.introduceContent.length && res.displayList.length && res.bookingList.length){
                        setBuildState(res.paramsId)
                    }
                    else{
                        setBuildState("")
                    }
                }
                catch{setBuildState("")}
                
            }
        })
        const unsubscribe2 = onSnapshot(timeref,(snapshot)=>{
            if(snapshot.exists()){
                const res:any = snapshot.data()
                try{
                    if(Object.keys(res).length){
                        setTimeState(true)
                    }
                    else{
                        setTimeState(false)
                    }
                }
                catch{setTimeState(false)}
            }
        })
        return ()=>{
            unsubscribe1();
            unsubscribe2()
        }
    },[])
    const protocol = window.location.protocol
    const host = window.location.host
    const url = protocol+host+"/"+buildstate
    return(
        <div className={styles.container}>
            <div className={styles.title}>{(buildstate && timestate)?"恭喜你成功編輯完您的網頁！":"您還有資料尚未設定"}</div>
            {(buildstate && timestate) && 
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
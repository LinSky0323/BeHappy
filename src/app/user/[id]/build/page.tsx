"use client"
import Header from "@/component/header/header";
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks";
import styles from "./page.module.css"
import { useEffect } from "react";
import { getListData } from "@/lib/firebase/firestore";
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices";
import { useParams, useRouter } from "next/navigation";

export default function Build(){
    const route = useRouter()
    const dispatch = useUserBuildDispatch()
    useEffect(()=>{
        const uid = localStorage.getItem("uid") as string
        getListData(uid).then((item)=>{
            if(item){
                dispatch(setBuildList(item))
            }
        })
    },[])
    const buildList  = useUserBuildSelector(selectBuildList)
    const handleClick = ()=>{
        const uid = localStorage.getItem("uid")
        route.push(`/user/${uid}/build/buildtitle`)
    }
    return(
        <>
        <main className={styles.title} >
            <div onClick={handleClick} className={styles.content}>開始創建/編輯您的網頁！</div>
        </main>
        </>      
    )
}
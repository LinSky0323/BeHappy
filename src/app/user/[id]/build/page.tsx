"use client"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks";
import styles from "./build.module.css"
import { useEffect, useState } from "react";
import { getListData } from "@/lib/firebase/firestore";
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices";
import {  useRouter } from "next/navigation";

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
        const targetDiv = document.querySelector("#build_title")
        const scrollDiv = document.querySelector("#scrollContainer")
        if(targetDiv && scrollDiv){
            const high = targetDiv.getBoundingClientRect().top
            scrollDiv.scrollTo({
                top:high-145,
                behavior:"smooth"
            })
        }
    }
    
    return(
        <>
        <div className={styles.title} >
            <div onClick={handleClick} className={styles.content}>開始創建/編輯您的網頁！</div>
        </div>
        </>      
    )
}
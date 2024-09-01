"use client"
import TimeForm from "@/component/form/timeForm/timeForm"
import styles from "./page.module.css"
import FormTitle from "@/component/form/title"
import { LastButton } from "@/component/button/lastButton/page"
import { NextButton } from "@/component/button/nextButton/page"
import { useState } from "react"


export default function BuildTime(){
    const [ischeck,setIscheck] = useState(0)
    return(
        <div className={styles.container}>
            <FormTitle name={ischeck===0?"批量編輯可預約時間":ischeck===1?"單日修改可預約時間":"查詢已設定可預約時間"}/>
            <TimeForm ischeck = {ischeck} setIscheck = {setIscheck}/>
            <div className={styles.btnContainer}><LastButton url="builditem"/><NextButton url="buildcomplete"/></div>
        </div>
    )
}
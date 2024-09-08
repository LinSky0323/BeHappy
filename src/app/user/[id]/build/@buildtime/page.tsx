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
            {ischeck===0 && <><div className={styles.remark}>*可按著拖拉一次多選，點擊確認後會將所選日期的時間統一改為所選時間</div><div className={styles.remark2}>*點擊清空會將所選日期的時間全部清除</div></>}
            {ischeck===1 && <div className={styles.remark}>*點擊想修改的日期，點擊確認後會將該日的可預約時間改為所選時間</div>}
            {ischeck===2 && <div className={styles.remark}>*點擊想查詢的日期，僅可查看無法修改</div>}
            <FormTitle name={ischeck===0?"批量編輯可預約時間":ischeck===1?"單日修改可預約時間":"查詢已設定可預約時間"}/>
            <TimeForm ischeck = {ischeck} setIscheck = {setIscheck}/>
            <div className={styles.btnContainer}><LastButton url="build_item"/><NextButton url="build_id"/></div>
        </div>
    )
}
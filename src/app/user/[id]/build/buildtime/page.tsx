"use client"
import TimeForm from "@/component/form/timeForm/timeForm"
import styles from "./page.module.css"
import FormTitle from "@/component/form/title"
import { LastButton } from "@/component/button/lastButton/page"
import { NextButton } from "@/component/button/nextButton/page"


export default function BuildTime(){
    return(
        <div className={styles.container}>
            <FormTitle name="編輯你可預約的時間"/>
            <TimeForm/>
            <div className={styles.btnContainer}><LastButton url="builditem"/><NextButton url="buildcomplete"/></div>
        </div>
    )
}
"use client"
import BookingForm from "@/component/form/bookingForm/bookingForm"
import styles from "./page.module.css"
import FormTitle from "@/component/form/title"
import { LastButton } from "@/component/button/lastButton/page"
import { NextButton } from "@/component/button/nextButton/page"

export default function builditem(){
    return(
        <div className={styles.container}>
            <div className={styles.remark}>*若價錢或時間需「視情況而定」，請填入數字0</div>
            <div className={styles.remark2}>*時間以半小時(0.5)為最小單位</div>
            <FormTitle name="編輯你可供預約的服務項目"/>
            <BookingForm/>
            <div className={styles.btnContainer}><LastButton/><NextButton url="buildtime"/></div>
        </div>
    )
}
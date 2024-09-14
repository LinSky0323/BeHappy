"use client"
import DisplayForm from "@/component/form/displayForm/displayForm"
import styles from "./page.module.css"
import FormTitle from "@/component/form/title"
import { LastButton } from "@/component/button/lastButton/page"
import { NextButton } from "@/component/button/nextButton/page"

export default function BuildDisplay(){
    return(
        <div className={styles.container}>
            <div className={styles.remark}>*所有圖片皆會3:4等比例縮放</div>
            <div className={styles.remark2}>*種類數量不限，但一種作品只能展示4張</div>
            <FormTitle name="編輯你要展示的作品集"/>
            <DisplayForm/>
           
        </div>
    )
}
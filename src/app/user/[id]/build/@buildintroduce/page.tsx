"use client"
import IntroduceForm from "@/component/form/introduceForm/introduceForm"
import styles from "./page.module.css"
import FormTitle from "@/component/form/title"

export default function BuildIntroduce(){
    return(
        <div className={styles.container}>
            <div className={styles.remark}>*所有圖片皆會3:4等比例縮放</div>
            <FormTitle name="編輯你的個人自我介紹"/>
            <IntroduceForm/>
        </div>
    )
}
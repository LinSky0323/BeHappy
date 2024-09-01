"use client"
import IntroduceForm from "@/component/form/introduceForm/introduceForm"
import styles from "./page.module.css"
import FormTitle from "@/component/form/title"

export default function BuildIntroduce(){
    return(
        <div className={styles.container}>
            <FormTitle name="編輯你的個人自我介紹"/>
            <IntroduceForm/>
        </div>
    )
}
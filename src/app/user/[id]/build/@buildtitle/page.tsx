"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import TitleForm from "@/component/form/titleForm/titleForm"
import { NextButton } from "@/component/button/nextButton/page"

export default function BuildTitle(){
    return(
        <div className={styles.container}>
            <FormTitle name="編輯你的網頁標題" />
            <TitleForm/>
        </div>
    )
}
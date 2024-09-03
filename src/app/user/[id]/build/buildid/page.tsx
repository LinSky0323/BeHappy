"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import IdForm from "@/component/form/idForm/page"

export default function BuildTitle(){
    return(
        <div className={styles.container}>
            <FormTitle name="編輯你的網頁網址" />
            <IdForm/>
        </div>
    )
}
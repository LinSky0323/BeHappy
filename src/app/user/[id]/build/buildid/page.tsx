"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import IdForm from "@/component/form/idForm/page"

export default function BuildTitle(){
    return(
        <div className={styles.container}>
            <div className={styles.remark}>*網址只能設定「一次」，請確認好後按確認</div>
            <div className={styles.remark2}>*只能輸入英文數字和_符</div>
            <FormTitle name="編輯你的網頁網址" />
            <IdForm/>
        </div>
    )
}
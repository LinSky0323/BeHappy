"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { getProfile } from "@/lib/firebase/firestore"
import Image from "next/image"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { useFormState } from "react-dom"

export default function UserAcount (){
    const [profile,setProfile] = useState<any>({})
    const uid = localStorage.getItem("uid") as string
    const oldRemind = useChangeRemind()
    const newRemind = useChangeRemind()
    const reRemind = useChangeRemind()
    useEffect(()=>{
        getProfile(uid).then((res)=>{
            setProfile(res)
        })
    },[])
    const submit = (prevDtate:any,formData:FormData)=>{
        const oldPassword = formData.get("oldPassword")
        const newPassword = formData.get("newPassword")
        const rePassword = formData.get("rePassword")
        
    }
    const [state,formAction] = useFormState(submit,null)
    return(
        <div>
            <FormTitle name="用戶等級"/>
            <div className={styles.content}>
                <div className={styles.item}>{profile.level?"付費用戶":"免費用戶"}<div className={styles.imgContainer}><Image alt="level" src={profile.level?"/crown.png":"/profile.png"} fill sizes="20"/></div></div>
            </div>
            <FormTitle name="修改密碼"/>
            <form className={styles.content} action={formAction}>
                <div className={styles.item}><label>舊的密碼</label><input className={styles.input} type="password" name="oldPassword" placeholder="輸入現在的密碼"/> {oldRemind.state && <div className={styles.remind}>{oldRemind.state}</div>}</div>
                <div className={styles.item}><label>新的密碼</label><input className={styles.input} type="password" name="newPassword" placeholder="輸入新的密碼"/>  {newRemind.state && <div className={styles.remind}>{newRemind.state}</div>}</div>
                <div className={styles.item}><label>再打一次</label><input className={styles.input} type="password" name="rePassword" placeholder="再輸入一次"/>  {reRemind.state && <div className={styles.remind}>{reRemind.state}</div>}</div>
                <div className={styles.btn}><SubmitButton name="送出"/></div>
            </form>
        </div>
    )
}
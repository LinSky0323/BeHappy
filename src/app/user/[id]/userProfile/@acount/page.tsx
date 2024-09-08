"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import {useRef, useState} from "react"
import Image from "next/image"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { useFormState } from "react-dom"
import { changePassword } from "@/lib/firebase/firaAuth"
import { usePathname, useRouter } from "next/navigation"
import PayMask from "@/component/mask/payMask/page"

export default function UserAcount (){
    const level = localStorage.getItem("level")
    const route = useRouter()
    const path = usePathname()
    const uid = localStorage.getItem("uid") as string
    const oldRemind = useChangeRemind()
    const newRemind = useChangeRemind()
    const reRemind = useChangeRemind()
    const remind = useChangeRemind()
    const formRef = useRef<HTMLFormElement>(null)
    const [open,setOpen] = useState(false)

    const submit = async(prevDtate:any,formData:FormData)=>{
        const oldPassword = formData.get("oldPassword") as string
        const newPassword = formData.get("newPassword") as string
        const rePassword = formData.get("rePassword") as string
        if(!oldPassword){oldRemind.setRemind("請輸入現在的密碼");return}
        else if(!newPassword){newRemind.setRemind("請輸入新的密碼");return}
        else if(!rePassword){reRemind.setRemind("請再輸入一次新的密碼");return}
        else if(newPassword.length<6){newRemind.setRemind("密碼需大於6個字");return}
        else if(newPassword !== rePassword){reRemind.setRemind("輸入不一致");return}
        else if(newPassword === oldPassword){oldRemind.setRemind("不能輸入一樣的密碼");return}
        try{
            const res = await changePassword(oldPassword,newPassword) as string
            remind.setRemind(res)
            formRef.current?.reset()
        }
        catch(error:any){
            remind.setRemind(error)
        }
        
    }
    const [state,formAction] = useFormState(submit,null)

    const toPay = ()=>{
        setOpen(true)
        // route.push(path.split("/").slice(0,4).join("/")+"/levelup")
    }
    return(
        <div >
            {open && <PayMask setOpen = {setOpen}/>}
            <FormTitle name="用戶等級"/>
            <div className={styles.content}>
                <div className={styles.item}>{level==="1"?"付費用戶":"免費用戶"}<div style={level==="1"?{}:{backgroundColor:"rgb(220,220,220)"}} className={styles.imgContainer}><Image alt="level" src={level==="1"?"/star.png":"/profile.png"} fill sizes="20"/></div>
                {level==="1"?<></>:<div className={styles.clickpay} onClick={toPay}>付費升級，使用業者功能</div>}
                </div>
            </div>
            <FormTitle name="修改密碼"/>
            <form className={styles.content} action={formAction} ref={formRef}>
                <div className={styles.item}><label>舊的密碼</label><input className={styles.input} type="password" name="oldPassword" placeholder="輸入現在的密碼"/> {oldRemind.state && <div className={styles.remind}>{oldRemind.state}</div>}</div>
                <div className={styles.item}><label>新的密碼</label><input className={styles.input} type="password" name="newPassword" placeholder="輸入新的密碼"/>  {newRemind.state && <div className={styles.remind}>{newRemind.state}</div>}</div>
                <div className={styles.item}><label>再打一次</label><input className={styles.input} type="password" name="rePassword" placeholder="再輸入一次"/>  {reRemind.state && <div className={styles.remind}>{reRemind.state}</div>}</div>
                <div className={styles.btn}><SubmitButton name="送出"/>{remind.state && <div className={styles.remind}>{remind.state}</div>}</div>
            </form>
        </div>
    )
}
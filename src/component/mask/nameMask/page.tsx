"use client"

import { StopPropogation } from "@/lib/stopPropagation"
import styles from "./page.module.css"
import { SetStateAction, useEffect, useState } from "react"
import { getProfile, getRemark, setRemark } from "@/lib/firebase/firestore"
import FormTitle from "@/component/form/title"
import Image from "next/image"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { useFormState } from "react-dom"

export default function NameMask({item,setName}:{item:string,setName:React.Dispatch<SetStateAction<string|null>>}){
    const tradeUid = localStorage.getItem("uid") as string
    const handleClick = ()=>{
        setName(null)
    }
    const [list,setList] = useState<any>()
    const [remarkText,setRemarkText] = useState([])
    useEffect(()=>{
        getProfile(item).then((res:any)=>
            setList(res)
        );
        getRemark(tradeUid,item).then((res)=>
            setRemarkText(res.remark)
        )
    },[])
    const [edit,setEdit] = useState(false)

    const clickEdit = ()=>{
        setEdit(true)
    }
    const clickSubmit = async(prevState:any,formData:FormData)=>{
        const content = formData.get("remarkEdit")
        let introduceContent:any = []
        if(content && typeof content === 'string'){
            introduceContent = content.split("\n")
        }
        const res = await setRemark(tradeUid,item,{remark:introduceContent})
        setEdit(false)
        setRemarkText(introduceContent)
    }
    const [state,formAction] = useFormState(clickSubmit,null)
    if(!list)return null
    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.container} onClick={StopPropogation}>
                <div className={styles.title}>個人資訊</div>
                <div className={styles.content}>
                    <div className={styles.imgContainer}>
                        <Image alt="個人照" src={list.profileImage} fill style={{
                            objectFit: 'cover', 
                            objectPosition: 'center' 
                        }} sizes="150px"/>
                    </div>
                    <div className={styles.textContainer}>
                        <div className={styles.item}>
                            <div className={styles.tap}>姓名:</div>
                            <div className={styles.tapcontent}>{list.name}</div>
                        </div>
                        <div  className={styles.item}>
                            <div className={styles.tap}>Email:</div>
                            <div className={styles.tapcontent}>{list.email}</div>
                        </div>
                        <div  className={styles.item}>
                            <div className={styles.tap}>手機號碼:</div>
                            <div className={styles.tapcontent}>{list.phone}</div>
                        </div>
                        <div  className={styles.item}>
                            <div className={styles.tap}>性別:</div>
                            <div className={styles.tapcontent}>{list.sex==="male"?"男生":list.sex==="female"?"女生":"其他"}</div>
                        </div>
                        <div  className={styles.item}>
                            <div className={styles.tap}>生日:</div>
                            <div className={styles.tapcontent}>{`${list.year}/${list.month}/${list.day}`}</div>
                        </div>
                        <div  className={styles.item}>
                            <div className={styles.tap}>備註:<div onClick={clickEdit} style={{width:"20px",height:"20px",position:"relative",cursor:"pointer",backgroundColor:"white"}}><Image alt="pencil" src="/pencil.png" fill sizes="20px"/></div></div>
                            {edit?
                            <form action={formAction}>
                                <textarea name="remarkEdit" rows={4} cols={30} placeholder={remarkText.join("\n")}></textarea>
                                <SubmitButton name="送出"/>
                            </form>
                            : 
                            <div className={styles.tapremark}>
                                {remarkText.map((item,index)=>(<div key={index}>{item}</div>
                            ))}
                            </div>}
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
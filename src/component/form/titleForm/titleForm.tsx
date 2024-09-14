"use client"
import { useFormState } from "react-dom"
import styles from "./titleForm.module.css"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { createListData, getListData } from "@/lib/firebase/firestore"
import { useState,useEffect } from "react"
import { useChangeValue } from "@/lib/hook/useChangeValue"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { NextButton } from "@/component/button/nextButton/page"
import { LastButton } from "@/component/button/lastButton/page"


export default function TitleForm(){
    const buildList = useUserBuildSelector(selectBuildList)
    const [titleiswrite,setTitle] = useState(true)
    const [writeriswrite,setWriter] = useState(true)
    const titleinput = useChangeValue("")
    const writerinput = useChangeValue("")
    const titleRemind = useChangeRemind()
    const writerRemind = useChangeRemind()
    const uid = localStorage.getItem("uid") as string
    const dispatch = useUserBuildDispatch()
    useEffect(()=>{
        if(!buildList.titleName || !buildList.writerName){
            getListData(uid).then((item)=>{
                if(item){
                    dispatch(setBuildList(item))
                    if(item.titleName){
                        titleinput.setValue(item.titleName)
                        setTitle(false)
                    }
                    
                    if(item.writerName){
                        writerinput.setValue(item.writerName)
                        setWriter(false)
                    }
                }
            })
        }
    },[])
    useEffect(()=>{
        if(buildList.titleName){
            titleinput.setValue(buildList.titleName)
            setTitle(false)
        };
        if(buildList.writerName){
            writerinput.setValue(buildList.writerName)
            setWriter(false)
        }
    },[])
    

    const titlesubmit = async(prevState:any, formData:FormData)=>{
        const titleName = formData.get("titleName");
        const submitData = {titleName}
        const res = await createListData(uid,submitData) as string
        titleRemind.setRemind(res)
        setTitle(false)
    }
    const namesubmit = async(prevState:any, formData:FormData)=>{
        const writerName = formData.get("writerName");
        const submitData = {writerName}
        const res = await createListData(uid,submitData) as string
        writerRemind.setRemind(res)
        setWriter(false)
    }
    const titleUse = ()=>{
        setTitle(true)
    }
    const writerUse = ()=>{
        setWriter(true)
    }      

    const [titlestate,titleformAction] = useFormState(titlesubmit,null)
    const [namestate,nameformAction] = useFormState(namesubmit,null)

        return(
            <>
            <form className={styles.form} action={titleiswrite?titleformAction:titleUse}>
                <label>網頁名稱：</label><input type="text" name="titleName" value={titleinput.value} onChange={titleinput.onChange} disabled={!titleiswrite}></input>
                <SubmitButton name={titleiswrite?"送出":"修改"}/>
                {titleRemind.state && <div className={styles.remind}>{titleRemind.state}</div>}
            </form>
            <form className={styles.form} action={writeriswrite?nameformAction:writerUse}>
                <label>作者名稱：</label><input type="text" name="writerName"value={writerinput.value} onChange={writerinput.onChange} disabled={!writeriswrite} ></input>
                <SubmitButton name={writeriswrite?"送出":"修改"}/>
                {writerRemind.state && <div className={styles.remind}>{writerRemind.state}</div>}
            </form>

            </>
        )
}
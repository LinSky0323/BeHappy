"use client"
import { useFormState } from "react-dom"
import styles from "./page.module.css"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { checkParamsId, createListData, createParamsId, getListData } from "@/lib/firebase/firestore"
import { useState,useEffect } from "react"
import { useChangeValue } from "@/lib/hook/useChangeValue"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { NextButton } from "@/component/button/nextButton/page"
import { LastButton } from "@/component/button/lastButton/page"


export default function IdForm(){
    const buildList = useUserBuildSelector(selectBuildList)
    const [paramsIdwrite,setParamsId] = useState(true)

    const paramsIdinput = useChangeValue("")
    const paramsIdRemind = useChangeRemind()
    const uid = localStorage.getItem("uid") as string
    const dispatch = useUserBuildDispatch()
    useEffect(()=>{
        if(!buildList.paramsId){
            getListData(uid).then((item)=>{
                if(item){
                    dispatch(setBuildList(item))
                    if(item.paramsId){
                        paramsIdinput.setValue(item.paramsId)
                        setParamsId(false)
                    }
                }
            })
        }
    },[])
    useEffect(()=>{
        if(buildList.paramsId){
            paramsIdinput.setValue(buildList.paramsId)
            setParamsId(false)
        };
    },[])
    

    const titlesubmit = async(prevState:any, formData:FormData)=>{
        const Reg = /^[a-zA-Z0-9_]+$/
        const paramsId = formData.get("paramsId") as string;
        if(!Reg.test(paramsId)){
            paramsIdRemind.setRemind("請輸入英文 數字 _ ")
            return
        }
        const submitData = {paramsId}
        const check = await checkParamsId(paramsId,uid)
        if(check===true){
            await createListData(uid,submitData) 
            const res = await createParamsId(paramsId,{uid:uid}) as string
            paramsIdRemind.setRemind("修改成功")
            setParamsId(false)
        }
        else{
            paramsIdRemind.setRemind("網址跟別人重複了")
            return
        }
        
    }

    const titleUse = ()=>{
        setParamsId(true)
    }
    const [titlestate,paramsIdformAction] = useFormState(titlesubmit,null)

        return(
            <>
            <form className={styles.form} action={paramsIdwrite?paramsIdformAction:titleUse}>
                <label>網址：</label><input type="text" name="paramsId" value={paramsIdinput.value} onChange={paramsIdinput.onChange} disabled={!paramsIdwrite}></input>
                {paramsIdwrite?<SubmitButton name="確認"/>:null}
                {paramsIdRemind.state && <div className={styles.remind}>{paramsIdRemind.state}</div>}
            </form>
            <div className={styles.btnContainer}><LastButton url="buildtime"/><div><NextButton url="buildcomplete"/></div></div>
            </>
        )
}
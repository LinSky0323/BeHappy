"use client"

import { StopPropogation } from "@/lib/stopPropagation"
import styles from "./page.module.css"
import { SetStateAction, useRef } from "react"
import { setTotalPrice } from "@/lib/firebase/firestore"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"

interface Price{
    guestUid:string,
    tradeUid:string,
    id:string
}

export default function PriceMask({item,setPrice}:{item:Price,setPrice:React.Dispatch<SetStateAction<Price|null>>}){
    const ref = useRef<HTMLInputElement | null>(null)
    const keyRef = useRef<HTMLButtonElement | null>(null) 
    const remind = useChangeRemind()
    const handleClick = ()=>{
        setPrice(null)
    }
    const handleEnter = (e:React.KeyboardEvent)=>{
        if(e.key==="Enter"){
            if(keyRef.current){
                keyRef.current.click()
            }
        }
    }
    const submit = async()=>{
        if(ref.current){
            const value = ref.current.value
            if(!Number(value) || Number(value)<0 || Number(value)%1!==0){
                remind.setRemind("請輸入正確的數字")
                return
            }
            const res = await setTotalPrice(item.guestUid,item.tradeUid,item.id,Number(value))
            if(res){
                setPrice(null)
            }
        }
        
    }

    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.container} onClick={StopPropogation}>
            <div className={styles.title}style={{marginTop:"10px"}}>實收金額</div>
                <div style={{display:"flex",marginTop:"10px"}}> 
                    <input ref={ref} className={styles.input} type = "text" placeholder="單位:元" onKeyDown={(e)=>handleEnter(e)}></input>
                    <button ref={keyRef} className={styles.btn} onClick={submit}>確認</button>
                </div>
                {remind.state && <div className={styles.remind}>{remind.state}</div>}
            </div>
        </div>
    )
}
"use client"

import { StopPropogation } from "@/lib/stopPropagation"
import styles from "./page.module.css"
import { SetStateAction, useEffect, useState } from "react"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { checkBookingItem } from "@/lib/firebase/firestore"

const state = ["未確認","已確認","已拒絕","已完成","已取消","未履約"]
const typeList = ["","接受預約","拒絕預約","完成預約","取消預約","未履約"]
const type1 = [1,2,4]
const type2 = [3,5,4]
export default function CheckMask({item,setCheck}:{item:any,setCheck:React.Dispatch<SetStateAction<any>>}){
    const [type,setType] = useState<number[]>([])
    const tradeUid = localStorage.getItem("uid") as string
    const remind = useChangeRemind()
    useEffect(()=>{
        if(item.check===0){
            setType(type1)
        }
        else if(item.check===1){
            setType(type2)
        }
    },[])
    const handleClick = ()=>{
        setCheck(null)
    }
    const submit = async(i:number)=>{
        const res = await checkBookingItem(item.guestUid,tradeUid,item.id,i,item.year,item.month,item.day,item.hours)
        if(res){
            setCheck(false)
        }
        else{
            remind.setRemind("發生錯誤")
        }
    }
    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.container} onClick={StopPropogation}>
                <div className={styles.title}>管理訂單狀態</div>
                <div className={styles.tapContainer}>
                    {type.map((item:number,index:number)=>(
                        <div key={index} className={`${styles.tap} ${(item===1||item===3)&&styles.good} ${(item===2||item===4||item===5)&&styles.bad}`}  onClick={()=>submit(item)}>{typeList[item]}</div>
                    ))}
                </div>
                <div className={styles.remark}>「拒絕」、「取消」、「完成」、「未履約」之後訂單內容將無法修改!</div>
                {remind.state && <div className={styles.remind}>{remind.state}</div>}
            </div>
        </div>
    )
}
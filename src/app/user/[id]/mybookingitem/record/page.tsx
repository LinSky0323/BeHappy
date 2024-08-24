"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import { useTransactionDispatch, useTransactionSelector } from "@/lib/store/hooks"
import { selectTranscationList, setTranscationList } from "@/lib/store/features/transcationSlices"
import { useEffect, useState } from "react"
import { getShopping } from "@/lib/firebase/firestore"

const state = ["未確認","已確認","已拒絕","已完成","已取消","未履約"]

export default function Record(){
    const day = new Date()
    const onlyday = new Date(day.getFullYear(),day.getMonth(),day.getDate()) as any
    const uid = localStorage.getItem("uid") as string
    const dispatch = useTransactionDispatch()
    const transcationList : any = useTransactionSelector(selectTranscationList)
    const [list,setList] = useState(transcationList.list)
    useEffect(()=>{
        if(!transcationList.list){
            getShopping(uid).then((res:any)=>{
                if(res){
                    dispatch(setTranscationList(res))
                    setList(res)
                }
            })
        }
    },[])
    return(
        <main>
            <FormTitle name = "預約記錄"/>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={`${styles.th} ${styles.th1}`}>預約店家</th>
                        <th className={`${styles.th} ${styles.th2}`}>預約日期</th>
                        <th className={`${styles.th} ${styles.th2}`}>預約時間</th>
                        <th className={`${styles.th} ${styles.th3}`}>預約項目</th>
                        <th className={`${styles.th} ${styles.th4}`}>花費金額</th>
                        <th className={`${styles.th} ${styles.th5}`}>訂單狀態</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((item:any,index:number)=>{
                        if(new Date(item.year,item.month-1,item.day) as any - onlyday>=0){
                            return null
                        }
                        return(
                            <tr key={index}>
                            <td className={styles.td}>{item.tradeName}</td>
                            <td className={styles.td}>{item.year+"/"+item.month+"/"+item.day}</td>
                            <td className={styles.td}>{item.totalTime===-1?`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")}起`:`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")} 到 ${((item.hours[item.hours.length-1]+50)%100===0)?((item.hours[item.hours.length-1]+50)/100)+":00":(Math.floor((item.hours[item.hours.length-1]+50)/100)+":30")}`}</td>
                            <td className={styles.td}>{item.items}</td>
                            <td className={styles.td}>{item.totalPrice===-1?"視情況而定":item.totalPrice+"元"}</td>
                            <td className={styles.td}>{state[item.check]}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}
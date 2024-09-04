"use client"

import { StopPropogation } from "@/lib/stopPropagation"
import styles from "./page.module.css"
import { SetStateAction, useState } from "react"
import ScheduleOut from "@/component/schedule/scheduleout"
import DayScheduleBooking from "@/component/daySchedule/dayScheduleBooking"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { changeTimeItem } from "@/lib/firebase/firestore"



export default function DateMask({item,setDate}:{item:any,setDate:React.Dispatch<SetStateAction<any>>}){
    const handleClick = ()=>{
        setDate(null)
    }
    const clickX = ()=>{
        setDate(null)
    }
    const remind = useChangeRemind()
    const [chooseday,setChooseday] = useState<any>({year:item.item.year,month:item.item.month,day:item.item.day})
    const [hours,setHours] = useState<number[]>([])
    const [thisItem,setThisItem] = useState({year:item.item.year,month:item.item.month,day:item.item.day,hours:item.item.hours})
    const submit = async()=>{

        if(!hours.length){
            remind.setRemind("請選擇新的時間")
            return
        }
        try{
            const date = new Date(chooseday.year,chooseday.month,chooseday.day,(hours[0]/100))
            const reserveTime = date.getTime()
            const res = await changeTimeItem(item.item.guestUid,item.item.tradeUid,item.item.id,thisItem.year,thisItem.month,thisItem.day,thisItem.hours,chooseday.year,chooseday.month,chooseday.day,hours,reserveTime)
            if(res){
                setHours([])
                setThisItem({year:chooseday.year , month:chooseday.month , day:chooseday.day , hours:hours})
                remind.setRemind("修改成功")
                setDate(null)
            }
        }
        catch(error){
            remind.setRemind("發生錯誤")
        }
    }

    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.container} onClick={StopPropogation}>
                <div className={styles.x} onClick={clickX}>X</div>
                <div className={styles.remark}>*建議先和顧客溝通再進行修改</div>
                <div className={styles.title}>修改預約時間</div>
                <div className={styles.timeContainer}>
                    <ScheduleOut list = {item.time} chooseday={chooseday} setChooseday={setChooseday} thisItem={thisItem} setHours={setHours}/>
                    <DayScheduleBooking list={item.time} chooseday={chooseday} hours = {hours} setHours = {setHours} thisItem = {thisItem} remind = {remind}/>
                </div>
                {remind.state && <div className={styles.remind}>{remind.state}</div>}
                <button className={styles.btn} onClick={submit}>修改</button>
            </div>
        </div>
    )
}
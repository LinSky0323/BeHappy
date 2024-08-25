"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import ScheduleBooking from "@/component/schedule/scheduleBooking"
import { useEffect, useState } from "react"
import { useBookingListDispatch, useBookingListSelector } from "@/lib/store/hooks"
import { selectBookingList, selectTimeList, setBookingList, setTimeList } from "@/lib/store/features/bookingListSlices"
import { getBooking, getTimeData } from "@/lib/firebase/firestore"
import NameMask from "@/component/mask/nameMask/page"
import DateMask from "@/component/mask/dateMask/page"
import PriceMask from "@/component/mask/priceMask/page"
import CheckMask from "@/component/mask/checkMask/page"
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore"

const state = ["未確認","已確認","已拒絕","已完成","已取消","未履約"]
interface Price{
    guestUid:string,
    tradeUid:string,
    id:string
}
export default function BookingList(){
    const Day = new Date()
    const [name,setName] = useState<string|null>(null)
    const [date,setDate] = useState<any>(null)
    const [price,setPrice] = useState<Price | null>(null)
    const [check,setCheck] = useState(null)
    const dispatch = useBookingListDispatch()
    const timeList = useBookingListSelector(selectTimeList) as any
    const bookingList = useBookingListSelector(selectBookingList) as any
    const [time,setTime] = useState(timeList)
    const [booking,setBooking] = useState(bookingList)
    const [chooseday,setChooseday] = useState<any>({})
    const uid = localStorage.getItem("uid") as string
    useEffect(()=>{
        const db = getFirestore()
        const ref = collection(db,"IO","booking",uid)
        const unsubscribe = onSnapshot(ref,(message)=>{
            const changes = message.docChanges()
            message.docChanges().forEach((change)=>{
                getBooking(uid).then((res:any)=>{
                    setBooking(res)
                    dispatch(setBookingList(res))
                })
                getTimeData(uid).then((res:any)=>{
                    setTime(res)
                    dispatch(setTimeList(res))
                })
            })
        })
        return ()=>unsubscribe()
    },[])
    const clickName = (guestUid:string)=>{
        setName(guestUid)
    }
    const clickDate = (item:any,time:any)=>{
        setDate({item,time})
    }
    const clickPrice = (item:Price)=>{
        setPrice(item)
    }
    const clickCheck = (item:any)=>{
        setCheck(item)
    }

    return(
        <div>
            <FormTitle name = "管理你的預約"/>
            {name && <NameMask item = {name} setName = {setName}/>}
            {date && <DateMask item = {date} setDate = {setDate}/>}
            {price && <PriceMask item = {price} setPrice = {setPrice}/>}
            {check && <CheckMask item = {check} setCheck = {setCheck}/>}
            <div style={{display:"flex"}}>
                <ScheduleBooking list={time} chooseday={chooseday} setChooseday={setChooseday}/>
                <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.thead}>
                            <th className={`${styles.th} ${styles.th1} ${styles.thead}`}>預約人</th>
                            <th className={`${styles.th} ${styles.th2} ${styles.thead}`}>預約日期</th>
                            <th className={`${styles.th} ${styles.th2} ${styles.thead}`}>預約時間</th>
                            <th className={`${styles.th} ${styles.th3} ${styles.thead}`}>預約項目</th>
                            <th className={`${styles.th} ${styles.th4} ${styles.thead}`}>結帳金額</th>
                            <th className={`${styles.th} ${styles.th5} ${styles.thead}`}>訂單狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(chooseday).length!==0 ?
                            (booking.length ? booking.map((item:any,index:number)=>{
                                if(item.year === chooseday.year && item.month === chooseday.month && item.day === chooseday.day){
                                    return(
                                        <tr key={index}>
                                            <td className={`${styles.td} ${styles.canClick}`} onClick={()=>clickName(item.guestUid)}>{item.guestName}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick}`} onClick={(item.check===0 || item.check===1)?()=>clickDate({tradeUid:uid,...item},time):undefined}>{item.year+"/"+item.month+"/"+item.day}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick}`} onClick={(item.check===0 || item.check===1)?()=>clickDate({tradeUid:uid,...item},time):undefined}>{item.totalTime===-1?`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")}起`:`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")} 到 ${((item.hours[item.hours.length-1]+50)%100===0)?((item.hours[item.hours.length-1]+50)/100)+":00":(Math.floor((item.hours[item.hours.length-1]+50)/100)+":30")}`}</td>
                                            <td className={styles.td}>{item.items}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick}`} onClick={(item.check===0 || item.check===1)?()=>clickPrice({tradeUid:uid,guestUid:item.guestUid,id:item.id}):undefined}>{item.totalPrice===-1?"視情況而定":item.totalPrice+"元"}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick} ${(item.check===2 || item.check===4 || item.check===5)&&styles.cancle} ${(item.check===3)&&styles.complete}`} onClick={(item.check===0 || item.check===1)?()=>clickCheck({tradeUid:uid,...item}):undefined}>{state[item.check]}</td>
                                        </tr>
                                    )
                                }
                                return null
                            }):<tr></tr>)
                        :
                            (booking.length ? booking.map((item:any,index:number)=>{
                                if((item.year>Day.getFullYear()) || (item.year===Day.getFullYear()&&item.month>Day.getMonth()+1)||(item.year===Day.getFullYear()&&item.month===Day.getMonth()+1)&&item.day>=Day.getDate()){
                                    return(
                                        <tr key={index}>
                                            <td className={`${styles.td} ${styles.canClick}`} onClick={()=>clickName(item.guestUid)}>{item.guestName}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick}`} onClick={(item.check===0 || item.check===1)?()=>clickDate({tradeUid:uid,...item},time):undefined}>{item.year+"/"+item.month+"/"+item.day}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick}`} onClick={(item.check===0 || item.check===1)?()=>clickDate({tradeUid:uid,...item},time):undefined}>{item.totalTime===-1?`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")}起`:`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")} 到 ${((item.hours[item.hours.length-1]+50)%100===0)?((item.hours[item.hours.length-1]+50)/100)+":00":(Math.floor((item.hours[item.hours.length-1]+50)/100)+":30")}`}</td>
                                            <td className={styles.td}>{item.items}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick}`} onClick={(item.check===0 || item.check===1)?()=>clickPrice({tradeUid:uid,guestUid:item.guestUid,id:item.id}):undefined}>{item.totalPrice===-1?"視情況而定":item.totalPrice+"元"}</td>
                                            <td className={`${styles.td} ${(item.check===0 || item.check===1)&&styles.canClick} ${(item.check===2 || item.check===4 || item.check===5)&&styles.cancle} ${(item.check===3)&&styles.complete}`} onClick={(item.check===0 || item.check===1)?()=>clickCheck({tradeUid:uid,...item}):undefined}>{state[item.check]}</td>
                                        </tr>
                                    )
                                }
                                return null
                            }):<tr></tr>)
                        }
                    </tbody>
                </table>
                </div>
            </div>

        </div>
    )
}
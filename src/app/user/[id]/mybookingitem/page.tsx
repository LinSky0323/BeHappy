"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import { SetStateAction, useEffect, useState } from "react"
import { useTransactionDispatch, useTransactionSelector } from "@/lib/store/hooks"
import { selectTranscationList, setTranscationList } from "@/lib/store/features/transcationSlices"
import { checkBookingItem, getShopping } from "@/lib/firebase/firestore"
import { StopPropogation } from "@/lib/stopPropagation"

const state = ["未確認","已確認","已拒絕","已完成","已取消","未履約"]

const Mask = ({item,setMask,onlyday}:{item:any,setMask:React.Dispatch<SetStateAction<{}|null>>,onlyday:any})=>{
    const handleClick = ()=>{
        setMask(null)
    }
    const thisday = new Date(item.year,item.month-1,item.day) as any
    const clickCheck = async()=>{
        if(thisday-onlyday<=8640000){
            alert("前一日不能取消")
            return
        }
        const gusetUid = localStorage.getItem("uid") as string
        try{
            const res = await checkBookingItem(gusetUid,item.tradeUid,item.id,4,item.year,item.month,item.day,item.hours)
            alert(res)
            window.location.reload();   
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.check} onClick={StopPropogation}>{`確定要取消「${item.tradeName}」在 ${item.year}/${item.month}/${item.day} 的預約 嗎? `}
            <button className={styles.checkBtn} onClick={clickCheck}>確定</button>
            </div>
            
        </div>
    )
}

export default function MyBookingItem(){
    const [mask,setMask] = useState<{}|null>(null)
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

    const clickCancle = (item:any)=>{
        setMask(item)
    }
    return(
        <main>
            <div className={styles.remark}>*預約日期前1天無法取消</div>
            {mask && <Mask item = {mask} setMask = {setMask} onlyday = {onlyday}/>}
            <FormTitle name = "您的預約"/>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.thead}>
                            <th className={`${styles.th} ${styles.th1} ${styles.thead}`}>預約店家</th>
                            <th className={`${styles.th} ${styles.th2} ${styles.thead}`}>預約日期</th>
                            <th className={`${styles.th} ${styles.th2} ${styles.thead}`}>預約時間</th>
                            <th className={`${styles.th} ${styles.th3} ${styles.thead}`}>預約項目</th>
                            <th className={`${styles.th} ${styles.th4} ${styles.thead}`}>預計金額</th>
                            <th className={`${styles.th} ${styles.th5} ${styles.thead}`}>訂單狀態</th>
                            <th className={`${styles.th} ${styles.th6} ${styles.thead}`}>取消預約</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.map((item:any,index:number)=>{
                            if(new Date(item.year,item.month-1,item.day) as any - onlyday<0){
                                return null
                            }
                            return(
                                <tr key={index}>
                                <td className={styles.td}>{item.tradeName}</td>
                                <td className={styles.td}>{item.year+"/"+item.month+"/"+item.day}</td>
                                <td className={styles.td}>{item.totalTime===-1?`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")}起`:`${(item.hours[0]%100===0)?(item.hours[0]/100)+":00":(Math.floor(item.hours[0]/100)+":30")} 到 ${((item.hours[item.hours.length-1]+50)%100===0)?((item.hours[item.hours.length-1]+50)/100)+":00":(Math.floor((item.hours[item.hours.length-1]+50)/100)+":30")}`}</td>
                                <td className={styles.td}>{item.items}</td>
                                <td className={styles.td}>{item.totalPrice===-1?"視情況而定":item.totalPrice+"元"}</td>
                                <td className={`${styles.td} ${(item.check===2||item.check===4||item.check===5) && styles.cancle} ${item.check===1 && styles.receive} ${item.check===3 && styles.complete}`}>{state[item.check]}</td>
                                <td className={`${styles.td} ${item.check<2 && styles.x}`} onClick={item.check>1?undefined:()=>clickCancle(item)}>{(item.check<2) && "x"}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
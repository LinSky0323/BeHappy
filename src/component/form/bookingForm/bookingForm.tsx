"use client"
import { useFormState } from "react-dom"
import styles from "./bookingForm.module.css"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { createListData, getListData } from "@/lib/firebase/firestore"
import { useEffect, useState } from "react"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { useChangeValue } from "@/lib/hook/useChangeValue"
import { time } from "console"


export default function BookingForm(){
    const buildList = useUserBuildSelector(selectBuildList)
    const dispatch = useUserBuildDispatch()
    const [itemlist,setItemlist] = useState<{item:string,price:number,time:number}[]>((buildList?.bookingList?.length)?buildList.bookingList:[])
    const remind = useChangeRemind()
    const nameinput = useChangeValue("")
    const priceinput = useChangeValue("")
    const timeinput = useChangeValue("")
    const uid = localStorage.getItem("uid") as string
    useEffect(()=>{
        if(!buildList.bookingList?.length){
            getListData(uid).then((item)=>{
                if(item){
                    dispatch(setBuildList(item))
                    setItemlist(item.bookingList)
                }
            })
        }
    },[])
    const submit = async(prevState:any, formData:FormData)=>{
        const itemName = formData.get("bookingItemName")
        const itemPrice : number|null = formData.get("bookingItemPrice")?parseInt(formData.get("bookingItemPrice") as string):null
        const itemTime = formData.get("bookingItemTime")?parseFloat(formData.get("bookingItemTime") as string):null
        if(!itemName){
            remind.setRemind("請輸入項目名稱")
            return
        }
        if(!itemPrice || Number.isNaN(itemPrice)){
            remind.setRemind("費用請輸入數字")
            return
        }
        if(!itemTime || Number.isNaN(itemTime)){
            remind.setRemind("時間請輸入數字")
            return
        }
        if(itemTime % 0.5 !== 0){
            remind.setRemind("以0.5hr為單位")
            return
        }

        else if(itemName && (itemPrice || itemPrice===0) && (itemTime != null && itemTime % 0.5 === 0)){
            const newList = [...(buildList.bookingList||[])]
            const newObject = {item:itemName,price:itemPrice,time:itemTime}
            newList.push(newObject)
            const submitData = {bookingList:newList}
            const dispatchData = {...buildList,bookingList:newList}
            dispatch(setBuildList(dispatchData))
            setItemlist(newList)
            const res = await createListData(uid,submitData) as string
            remind.setRemind(res)
            nameinput.setValue("")
            priceinput.setValue("")
            timeinput.setValue("")
        }
    }
    const delItem = async(index:number)=>{
        const newList = [...itemlist]
        newList.splice(index,1)
        const dispatchData = {...buildList,bookingList:newList}
        const submitData = {bookingList:newList}
        await createListData(uid,submitData)
        dispatch(setBuildList(dispatchData))
        setItemlist(newList)
    }
    const [state,formAction] = useFormState(submit,null)
    const checkDel = (index:number)=>{
        delItem(index)
    }

    return(
        <section className={styles.container}>
            <form className={styles.form} action={formAction}>
                <label>預約項目：</label><input className={styles.input} type="text" name="bookingItemName" value={nameinput.value} onChange={nameinput.onChange}></input>
                <label>預估費用：</label><input className={styles.input} type="text" name="bookingItemPrice" value={priceinput.value} onChange={priceinput.onChange} placeholder="單位:元"></input>
                <label>預估時間：</label><input className={styles.input} type="text" name="bookingItemTime" value={timeinput.value} onChange={timeinput.onChange} placeholder="單位:小時"></input>
                <div className={styles.btn}>
                    <SubmitButton name="送出"/>
                    {remind.state && <div className={styles.remind}>{remind.state}</div>}
                    
                </div>
            </form>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thI}>預約項目</th>
                        <th className={styles.th}>預估費用</th>
                        <th className={styles.th}>預估時間</th>
                        <th className={styles.thD}>刪除</th>
                    </tr>
                </thead>
                <tbody>
                    {itemlist && itemlist.map((item,index)=>(
                        <tr key={index}>
                            <td className={styles.td}>{item.item}</td>
                            <td className={styles.td}>{item.price===0?"視情況而定":`$${item.price}`}</td>
                            <td className={styles.td}>{item.time===0?"視情況而定":`${item.time}hr`}</td>
                            <td className={styles.td}><div className={styles.del} onClick={()=>checkDel(index)}>x</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
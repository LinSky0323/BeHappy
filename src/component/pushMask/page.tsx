"use client"
import { SetStateAction, useState } from "react"
import styles from "./page.module.css"
import { StopPropogation } from "@/lib/stopPropagation"
import { useFormState, useFormStatus } from "react-dom"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { getProfile, pushBookingItem, setProfile } from "@/lib/firebase/firestore"


export default function PushMask({push,setPush}:{push:any,setPush:React.Dispatch<SetStateAction<{}|null>>}){
    const {submitData,profile,titleName,writerName} = push
    const {pending} = useFormStatus()
    const [name,setName] = useState(profile.name)
    const [phone,setPhone] = useState(profile.phone)
    const hourstart = submitData.submitHour[0]%100===0?(submitData.submitHour[0]/100)+":00":(Math.floor(submitData.submitHour[0]/100))+":30"
    const hourend = (submitData.submitHour[(submitData.submitHour.length)-1]+50)%100===0?(submitData.submitHour[(submitData.submitHour.length)-1]+50)/100+":00":(Math.floor((submitData.submitHour[(submitData.submitHour.length)-1]+50)/100))+":30"
    const handleClick = ()=>{
        setPush(null)
    }
    const remind = useChangeRemind()
    const submit = async()=>{
        const tradeData:any = await getProfile(submitData.trade)
        if(!name){
            remind.setRemind("請正確填寫您的姓名")
            return
        }
        if(!phone||phone.length!==10){
            remind.setRemind("請正確填寫您的手機號碼(以 09 開頭)")
            return
        }

        const shoppingData = {
            tradeName:titleName,
            tradeUid:submitData.trade,
            items:submitData.items,
            year:submitData.year,
            month:submitData.month,
            day:submitData.day,
            hours:submitData.submitHour,
            totalPrice:submitData.totalPrice,
            check:null,
            complete:false,
        };
        const bookingData = {
            guestName:name,
            guestPhone:phone,
            guestUid:submitData.guest,
            guestEmail:profile.email,
            items:submitData.items,
            year:submitData.year,
            month:submitData.month,
            day:submitData.day,
            hours:submitData.submitHour,
            totalTime:submitData.totalTime,
            totalPrice:submitData.totalPrice,
            check:null,
            complete:false,
        }
        if(profile.name !== name || profile.phone !== phone){
            const newProfile = {...profile}
            newProfile.name = name;
            newProfile.phone = phone;
            await setProfile(submitData.guest,newProfile)
        }
        


        try{
            const result = await pushBookingItem(submitData.guest,submitData.trade,shoppingData,bookingData,submitData.year,submitData.month,submitData.day,submitData.submitHour)
            alert("感謝您的預定。訂單已送出")
            fetch("/api/sendmail",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    to: tradeData.email,
                    subject: `您的「${titleName}」有一筆新的訂單`,
                    body: `<h1>Hello ${writerName}</h1>
                    <h3>您收到一筆來自${profile.name}的預約</h3>
                    <h3>預約時間是${submitData.year}年${submitData.month}月${submitData.day}日</h3>
                    <h4>詳細情形請至<a href="${window.location.origin}/user/${submitData.trade}/bookingList">網站</a>查詢</h4>`,
                  }),
            })
            window.location.reload();
        }
        catch(error){
            console.log(error)
            remind.setRemind("送出失敗")
        }
    }
    const [state,formAction] = useFormState(submit,null)


    return(
        <div className={styles.mask} onClick={handleClick} >
            <form className={styles.window} onClick={(e)=>StopPropogation(e)} action={formAction}>
                <div className={styles.title}> 您的訂單：</div>
                <div>---------------------------------------------------------------------</div>
                <div className={styles.labelContainer}>
                    <label className={styles.label}>會員姓名：</label><input className={styles.input} value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className={styles.labelContainer}>
                    <label className={styles.label}>會員手機號碼：</label><input className={styles.input} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>---------------------------------------------------------------------</div>
                <div>預約項目：{submitData.items}</div>
                <div>預計金額：{submitData.totalPrice===-1?`試情況而定`:submitData.totalPrice+"元"}</div>
                <div>預約日期：{submitData.year}/{submitData.month}/{submitData.day}</div>
                <div>預約時間：{submitData.totalTime===-1?`${hourstart}起`:`${hourstart} 到 ${hourend}`}</div>
                <div>---------------------------------------------------------------------</div>
                <div >
                    {remind.state && <div className={styles.remind}>{remind.state}</div>}
                    <button type="submit" aria-disabled={pending} className={styles.btn} >確認送出!</button>
                </div>
            </form>
        </div>
    )
}
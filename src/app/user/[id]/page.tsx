"use client"
import styles from "./page.module.css"
import BigButton from "@/component/button/bigButton/page"

const guestNavList = [{name:"個人資料",id:"userProfile",img:"/profile.png"},{name:"我的預約",id:"mybookingitem",img:"/bookingItem.png"},{name:"訊息",id:"message",img:"/message.png"}]
const tradeNavlist = [{name:"個人資料",id:"userProfile",img:"/profile.png"},{name:"建立網頁",id:"build",img:"/build.png"},{name:"訂單確認",id:"bookingList",img:"/schedule.png"},{name:"訊息",id:"message",img:"/message.png"}]
export default function User(){
    const identity = Number(sessionStorage.getItem("identity"))

    return(
        <main className={styles.container}>
        {(identity===2?tradeNavlist:guestNavList).map((item,index)=>(
            <BigButton key={index} content={item.name} target = {item.id} img = {item.img}/>
        ))}
        </main>
    )
    
}
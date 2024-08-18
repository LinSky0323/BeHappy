"use client"
import { useParams, useRouter } from "next/navigation"
import styles from "./leftbar.module.css"

export default function LeftBar(){
    const route = useRouter()
    const url = useParams()
    const list = ["網頁主題","簡介","產品展示","預約項目","可預約時間","完成"]
    const urlList = ["buildtitle","buildintroduce","builddisplay","builditem","buildtime","buildcomplete"]
    const handleClick = (index:number)=>{
        route.push(`/user/${url.id}/build/${urlList[index]}`)
    } 
    return(
        <div className={styles.container}>
            {list.map((item,index)=>(
                <div key={index} className={styles.item} onClick={()=>handleClick(index)} >{item}</div>
            ))}
        </div>
    )
}
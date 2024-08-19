"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"


export default function StartBtn(){
    const route = useRouter()
    const click = ()=>{
        const uid = localStorage.getItem("uid")
        if(uid){
            route.push("/user/"+uid)
        }
        else{
            const btn = document.querySelector("#SLBtn") as HTMLDivElement
            btn.click()
        }
    }
    return(<button className={styles.start} onClick={click}>立刻開始使用！</button>)
}
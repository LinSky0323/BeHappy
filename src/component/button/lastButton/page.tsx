"use client"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"

export function LastButton(){
    const route = useRouter()
    const handleClick = ()=>{
        route.back()
    }
    return(
        <button className={styles.button} onClick={handleClick}>上一步</button>
    )
}
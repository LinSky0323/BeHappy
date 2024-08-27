"use client"
import styles from "./page.module.css"
import { usePathname, useRouter } from "next/navigation"

export function LastButton({url}:{url:string}){
    const path = usePathname()
    const p = path.split("/")
    let ans = ""
    if(p[4]){
        p[4] = url
        ans = p.slice(0,5).join("/")
    }
    const route = useRouter()
    const handleClick = ()=>{
        route.push(ans)

    }
    return(
        <button className={styles.button} onClick={handleClick}>上一步</button>
    )
}
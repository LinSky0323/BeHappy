"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { usePathname, useRouter } from "next/navigation"

export default function BigButton({content,target,img}:{content:string,target:string,img:string}){
    const url = usePathname()
    const route = useRouter()
    const targeturl = url+"/"+target
    const handleClick = ()=>{
        route.push(targeturl)
    }
    return(
        <button className={styles.btn} onClick={handleClick}>{content}
            <div className={styles.img}><Image alt={content} src={img} width={35} height={35}/></div>
        </button>
    )
}
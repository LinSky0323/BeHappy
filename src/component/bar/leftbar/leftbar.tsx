"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import styles from "./leftbar.module.css"
import { useState } from "react"

export default function LeftBar({list,path}:{list:{name:string,id:string}[],path:string}){
    const route = useRouter()
    const url = useParams()
    const P = usePathname()
    const pathname = P.split("/")[4]
    const [open,setOpen] = useState(false)
    const handleClick = (id:string,e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        route.push(`/user/${url.id}/${path}/${id}`)
        setOpen(false)
    } 
    const clickOpen = ()=>{
        setOpen(!open)
    }   
    return(
        <div className={styles.container} style={open?{left:"0"}:{}}>
            <button className={styles.btn} onClick={clickOpen}>{open?<div className={styles.arrowL}></div>:<div className={styles.arrowR}></div>}</button>
            {list.map((item:any,index)=>{
                return(
                <a key={index} href={`/user/${url.id}/${path}/${item.id}`} className={styles.a}><div  className={`${styles.item}  ${(((pathname===undefined)&&item.id==="/") || (pathname===item.id)) && styles.high }`} onClick={(e)=>handleClick(item.id,e)} >{item.name}</div></a>
            )})}
        </div>
    )
}
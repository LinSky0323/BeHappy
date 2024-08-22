"use client"
import { useParams, useRouter } from "next/navigation"
import styles from "./leftbar.module.css"

export default function LeftBar({list,path}:{list:{name:string,id:string}[],path:string}){
    const route = useRouter()
    const url = useParams()

    const handleClick = (id:string,e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        route.push(`/user/${url.id}/${path}/${id}`)
    } 
    return(
        <div className={styles.container}>
            {list.map((item:any,index)=>(
                <a key={index} href={`/user/${url.id}/${path}/${item.id}`} className={styles.a}><div  className={styles.item} onClick={(e)=>handleClick(item.id,e)} >{item.name}</div></a>
            ))}
        </div>
    )
}
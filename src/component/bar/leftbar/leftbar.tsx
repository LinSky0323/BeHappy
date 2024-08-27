"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import styles from "./leftbar.module.css"

export default function LeftBar({list,path}:{list:{name:string,id:string}[],path:string}){
    const route = useRouter()
    const url = useParams()
    const P = usePathname()
    const pathname = P.split("/")[4]

    const handleClick = (id:string,e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        route.push(`/user/${url.id}/${path}/${id}`)
    } 
    return(
        <div className={styles.container}>
            {list.map((item:any,index)=>{
                console.log(item.id)
                console.log(pathname)
                return(
                <a key={index} href={`/user/${url.id}/${path}/${item.id}`} className={styles.a}><div  className={`${styles.item}  ${(((pathname===undefined)&&item.id==="/") || (pathname===item.id)) && styles.high }`} onClick={(e)=>handleClick(item.id,e)} >{item.name}</div></a>
            )})}
        </div>
    )
}
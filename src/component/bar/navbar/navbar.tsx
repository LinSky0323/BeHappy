"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import styles from "./navbar.module.css"

export default function Navbar({list}:{list:{name:string,id:string}[]}){
    const params = usePathname()
    const router = useRouter()
    const param = params.split("/").slice(0,3).join("/")
    const handleClick = (item:{name:string,id:string},e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        e.stopPropagation()
        if(params.includes("user/")){
            router.push(param+"/"+item.id)
        }
        else{
            const targetDiv = document.querySelector(`#${item.id}`)
            if(targetDiv){
                const targetHigh = targetDiv.getBoundingClientRect().top
                const offset = -50
                const position = targetHigh+offset+window.scrollY
                window.scrollTo({
                    top:position,
                    behavior:"smooth"
                })
        }
        }
    }
    return(
        <div className={styles.bar}>
        {list.map((item,index)=>{
            return(
            <a key={index} href={`${param}/${item.id}`} className={`${styles.a} ${(params.split("/")[3]===item.id) && styles.high}`} onClick={(e) => e.preventDefault()}><div  className={styles.item} onClick={(e)=>handleClick(item,e)}>{item.name}</div></a>
        )})}
        </div>
    )
}
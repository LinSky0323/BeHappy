"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import styles from "./leftbar.module.css"
import { useEffect, useRef, useState } from "react"
import { setTime } from "@/lib/store/features/userBuildSlices"

export default function LeftBar({list,path}:{list:{name:string,id:string}[],path:string}){
    const route = useRouter()
    const url = useParams()
    const P = usePathname()
    const pathname = P.split("/")[4]
    const [ind,setIndex] = useState<number|null>(null)
    const [open,setOpen] = useState(false)
    const ref = useRef<Element[]>([])
    useEffect(()=>{
        const findDivs = ()=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    list.forEach((item,index)=>{
                        const target = document.querySelector(`#${item.id}`); 
                        if(target){
                            ref.current[index] = target
                        }
                    })
                    resolve(true)
                },300)
            })
        }
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry,index)=>{
                    if(entry.isIntersecting){
                        const i = entry.target.getAttribute("data-index")
                        setIndex(Number(i))
                    }
                })
            },{rootMargin:"-90% 0px -90% 0px"}
        )
        findDivs().then(()=>{
            ref.current.forEach((div)=>{
                if(div){
                    observer.observe(div)
                }
            })
        })
        return () => {
            ref.current.forEach((div) => {
              if (div) {
                observer.unobserve(div); 
              }
            });
          };

    },[])
    const handleClick = (id:string,e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        const targetDiv = document.querySelector(`#${id}`)
        const scrollContainer = document.querySelector("#scrollContainer")
        if(targetDiv && scrollContainer){
            const targetHigh = targetDiv.getBoundingClientRect().top
            const now = scrollContainer.scrollTop
            scrollContainer.scrollTo({
                top:now+targetHigh-145,
                behavior:"smooth"
            })
            
        }
        // route.push(`/user/${url.id}/${path}/${id}`)
        // setOpen(false)
    } 
    const clickOpen = ()=>{
        setOpen(!open)
    }   
    return(
        <div className={styles.container} style={open?{left:"0"}:{}}>
            <button className={styles.btn} onClick={clickOpen}>{open?<div className={styles.arrowL}></div>:<div className={styles.arrowR}></div>}</button>
            {list.map((item:any,index)=>{
                return(
               <div key={index}  className={`${styles.item}  ${(index === ind) && styles.high }`} onClick={(e)=>handleClick(item.id,e)} >{item.name}</div>
            )})}
        </div>
    )
}
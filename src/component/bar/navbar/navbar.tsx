"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import styles from "./navbar.module.css"
import { animated, to, useSprings } from "@react-spring/web"
import { useEffect, useRef, useState } from "react"

const po = (value:string)=>`${value}`
export default function Navbar({list}:{list:{name:string,id:string,list:[]}[]}){
    const barRef = useRef<(HTMLDivElement|null)[]>([])
    const params = usePathname()
    const router = useRouter()
    const [target,setTarget] = useState("")
    const param = params.split("/").slice(0,3).join("/")
    const [props,api] = useSprings(list.length,()=>({opacity:0,pointerEvents:to("none",po)}))
    const [line,lineapi] = useSprings(list.length,()=>({opacityline:0,y:0}))
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
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(target){
                const targetDiv = document.querySelector(`#${target}`)
                if(targetDiv){
                    const scrollDiv = document.querySelector("#scrollContainer")
                    const high = targetDiv.getBoundingClientRect().top
                    const gap = scrollDiv?.scrollTop as number
                    scrollDiv?.scrollTo({
                        top:high-gap-145,
                        behavior:"smooth"
                    })

                    clearInterval(interval)
                }
            }
        },100)
        setTarget("")
        
    },[target])
    const clickItem = async(item:{name:string,id:string,target:string},e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        e.stopPropagation()
        setTarget(item.target)
        router.push(param+"/"+item.id)
        
    }
    const handleMouseMove = (index:number)=>{
        api.start((i)=>{
            if(index !== i)return
            return({to:{opacity:1,pointerEvents:to("auto",po)}})
        })
        lineapi.start((i)=>{
            if(index !== i)return
            return({to:{opacityline:1,y:-8}})
        })
    }
    const handleMouseLeave = ()=>{
        api.start({opacity:0,pointerEvents:to("none",po)})
        lineapi.start({opacityline:0,y:0})
    }
    return(
        <div className={styles.bar}>
        {list.map((item,index)=>{
            const{opacity,pointerEvents} = props[index]
            const{opacityline,y} = line[index]
            return(
                <div key={index} className={styles.barContainer}>
                    <a  href={`${param}/${item.id}`} className={`${styles.a} ${(params.split("/")[3]===item.id) && styles.high}`} onClick={(e) => e.preventDefault()}>
                        <div onMouseMove={()=>handleMouseMove(index)} onMouseLeave={handleMouseLeave}  className={styles.item} onClick={(e)=>handleClick(item,e)}>{item.name}</div>
                    </a>
                    <animated.div className={styles.barline} style={{opacity:opacityline,y}}></animated.div>
                    <animated.div ref={(el) => {barRef.current[index] = el}}className={styles.selectbar} style={{opacity,pointerEvents}} onMouseMove={()=>handleMouseMove(index)} onMouseLeave={handleMouseLeave}>                      
                        {item.list && item.list.map((bar:{name:string,id:string,target:string},i)=>(
                            <a key={i} href={`${param}/${bar.id}`} className={`${styles.a} ${styles.bara}`} onClick={(e)=>e.preventDefault()}>
                                <div className={styles.baritem} onClick={(e)=>clickItem(bar,e)}>{bar.name}</div>
                            </a>
                        ))}
                    </animated.div>
                </div>
        )})}
        </div>
    )
}
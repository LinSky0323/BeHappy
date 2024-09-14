"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { animated, useSpring} from "@react-spring/web"
import { useEffect } from "react"

export function NextButton({url}:{url:string}){

    const [prop,api] = useSpring(()=>({
        from:{
            y:0
        }
    }))
    useEffect(()=>{
        api.start(()=>({
            to:{y:20},
            config:{duration:500},
            loop:{reverse:true}
        }))
    },[])
    const handleClick = ()=>{
        const targetDiv = document.querySelector(`#${url}`)
        const scrollDiv = document.querySelector("#scrollContainer")
        if(targetDiv && scrollDiv){
            const high = targetDiv.getBoundingClientRect().top
            const now = scrollDiv.scrollTop
            console.log(now,high)
            scrollDiv.scrollTo({
                top:now+high-145,
                behavior:"smooth"
            })
        }
    }
    return(  
        <animated.button className={styles.button} onClick={handleClick} style={{transform:prop.y.to((y)=>`translateY(${y}px)`)}}>
            <Image alt="downarrow" src="/downarrow.png" fill sizes="100%" style={{objectFit:"contain"}}/>
        </animated.button>
    )
}
"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import { useRef } from "react"
import { useSpring,animated,to } from "@react-spring/web"

const from = ()=>({x:0,y:0,s:1,config:{ 
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,}})
const trans = (x:number,y:number,s:number)=>`perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const calc = (x:number,y:number,rect:DOMRect)=>{
    return {x:-(y-rect.top-rect.height/2)/5,y:(x-rect.left-rect.width/2)/5,s:1.4}
}

export default function StartBtn(){
    const [props,api] = useSpring(()=>from())
    const ref = useRef<HTMLButtonElement>(null)
    const route = useRouter()
    const click = ()=>{
        const uid = localStorage.getItem("uid")
        if(uid){
            route.push("/user/"+uid)
        }
        else{
            const btn = document.querySelector("#SLBtn") as HTMLDivElement
            btn.click()
        }
    }
    const handleMouseLeave = ()=>{
        api.start({x:0,y:0,s:1})
    }
    const handleMouseMove = (e:React.MouseEvent)=>{
        if(ref.current){
            const point = calc(e.clientX,e.clientY,ref.current.getBoundingClientRect())
            api.start({x:point.x,y:point.y,s:point.s})
        }
        
    }
    return(<animated.button className={styles.start} ref = {ref} style={{transform:to([props.x,props.y,props.s],(x,y,s)=>trans(x,y,s))}} onClick={click} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className={styles.bling}></div>
        立刻開始使用！
        </animated.button>)
}
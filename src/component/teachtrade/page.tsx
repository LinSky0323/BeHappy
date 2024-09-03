"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./page.module.css" 
import { useSprings,animated,to as interpolate } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import Image from "next/image"

const cards = [{src:"/trade_display.png"},{src:"/trade_time.png"}]



export default function TeachTrade(){
    const ref = useRef<HTMLElement|null>(null)
    
    const to = (i: number) => ({
        x: 50,
        y: 20,
        scale: 1,
        rot: 0,
        delay: i * 100,
      })
    const from = (_i: number) => ({ x: -1500, rot: 0, scale: 1.5, y:0})
    
    const trans = (r: number, s: number) =>
      `perspective(1500px)  rotateY(${r / 10}deg) rotateZ(${r/2}deg) scale(${s})`
    
    const [gone] = useState(()=>new Set())
    const [props,api] = useSprings(cards.length,(i)=>({
        from:from(i)
    }))
    useEffect(()=>{
        const intersectionObserver = new IntersectionObserver((entries)=>{
            if(entries[0].intersectionRatio <=0 ){
                api.start((i)=>(from(i)))
            }
            else{
                setTimeout(()=>{
                    api.start((i)=>(to(i)))
                },500)
            }
        })
        if(ref.current){
            intersectionObserver.observe(ref.current)
        }
        return()=>{
            intersectionObserver.disconnect()
        }
    },[])
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir],velocity:[vx]},)=>{
        // if(xDir>0)return
        const trigger = vx > 0.2
        if(!down && trigger) gone.add(index);
        api.start((i)=>{
            if (index !== i) return
            const isGone = gone.has(index)
            const x = isGone?(200+window.innerWidth):down?mx+50:50;
            const rot = mx/100
            const scale = down?1.1:1
            return({
                x,
                rot,
                scale,
                delay: undefined,
                config:{ friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
            })
        })
        if(!down && gone.size === cards.length){
            setTimeout(()=>{
                gone.clear()
                api.start((i)=>to(i))
            },600)
        }
    }) 
    const clickRow = ()=>{
        gone.add(gone.size+1)
        api.start((i)=>{
            if (cards.length-gone.size !== i) return
            return({
                x:200+window.innerWidth,
                rot:10,
                scale:1.1,
                delay: undefined,
                config:{ friction: 50, tension: 200}
            })
        })
        if(gone.size === cards.length){
            setTimeout(()=>{
                gone.clear()
                api.start((i)=>to(i))
            },600)
        }
    }
    return(
    <section className={styles.container} ref={ref}>
            <div className={styles.title}>使用引導</div>
            <div className={styles.row} onClick={clickRow}>向右滑動<br/>{">>>"}</div>
            {props.map(({x,y,rot,scale},index)=>(       
                 <animated.div key={index}  className={styles.card} {...bind(index)} style={{x,y,transform: interpolate([rot, scale], trans),}}>
                     <div className={styles.imgContainer} style={{touchAction:"none",pointerEvents: "none"}}><Image  alt="教學"src={cards[index].src} fill sizes="100%" style={{objectFit:"cover"}}/></div>
                 </animated.div>
            ))}
    </section>
)}
"use client"
import { useState, CSSProperties, useEffect } from "react"
import styles from "./page.module.css"
import { useTransition, animated, AnimatedProps, useSpringRef } from "@react-spring/web"
import Image from "next/image"




export default function GusetDisplay(){
    
    const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
        ({ style }) => <animated.div className={styles.img} style={{ ...style}}><Image alt="img" src="/guest_page.png" fill sizes="100%" style={{objectFit:"cover"}}/></animated.div>,
        ({ style }) => <animated.div className={styles.img} style={{ ...style}}><Image alt="img" src="/guest_booking.png" fill sizes="100%" style={{objectFit:"cover"}}/></animated.div>
    ]

    
    
    
    const [index,setIndex] = useState(0)
    const transRef = useSpringRef()
    const transitions = useTransition(index,{
        ref:transRef,
        keys:null,
        from: { opacity: 0, transform: 'translateX(100%)'  },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })
    useEffect(()=>{
        transRef.start()
        const interval = setInterval(()=>{
            setIndex(state=>(state+1)%2)
        },5000)
        return()=>clearInterval(interval)
    },[index])
    const handleClick = ()=>{
        setIndex(state=>(state+1)%2)
    }
    return(
        <section className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.text1}>客戶</div>
                <div className={styles.text2Container}>
                <div className={`${styles.text2} ${index===0?styles.pick:undefined}`} onClick={()=>setIndex(0)}>預約想要的服務</div>
                <div className={`${styles.text2} ${index===1?styles.pick:undefined}`} onClick={()=>setIndex(1)}>查看預約記錄</div>
                </div>
            </div>
            <div onClick = {handleClick} className={styles.imgContainer}>
                {transitions((style,i)=>{
                    const Page = pages[i];
                    return <Page style = {style}/>
                })}
            </div>
        </section>
    )
}
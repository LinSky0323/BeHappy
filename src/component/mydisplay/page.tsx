"use client"

import { useEffect, useState } from "react"
import styles from "./page.module.css" 
import { useSpring, useSprings,animated,config } from "@react-spring/web"
import Image from "next/image"

const DisplayBlock = [{content:`使用者:\n展示資料、作品。\n設定預約內容。\n獲得網頁。\n後台管理訂單。`,},{content:"顧客：\n瀏覽服務。\n預約服務。\n後台查看預約狀態",}]



export default function MyDisplay(){
    const [toggle] = useState(new Set())
    const [props,api] = useSprings(2,(i)=>({from:{opacity:i?1:0}}))
    useEffect(()=>{
        api.start(i=>{
            const opacity = i?0:1
            return{
                opacity,
                loop:{
                    reverse:true
                },
                config: config.slow,
                delay:3000 
            }
        })
    },[])

    return(
        <section className={styles.container}>
            {props.map(({opacity},index)=>{
                if(index===0){
                    return(
                        <animated.div className={styles.content} style={{opacity}} key={index}>
                            <div className={styles.text}>{DisplayBlock[index].content.split('\n').map((line,i)=>(<span key={i}>{line}<br/></span>))}</div>
                            <div className={styles.img}>
                                <div className={styles.ImgContainer}><Image alt="預覽" src={"/trade_display.png"} fill sizes="100%" style={{ objectFit: 'cover' }}/></div>
                                <div className={styles.ImgContainer}><Image alt="預覽" src={"/trade_item.png"} fill sizes="100%" style={{ objectFit: 'cover' }}/></div>
                                <div className={styles.ImgContainer}><Image alt="預覽" src={"/trade_time.png"} fill sizes="100%" style={{ objectFit: 'cover' }}/></div>
                                <div className={styles.ImgContainer}><Image alt="預覽" src={"/trade_booking.png"} fill sizes="100%" style={{ objectFit: 'cover' }}/></div>
                            </div>
                        </animated.div>
                    )
                }
                else{
                    return(
                        <animated.div className={styles.content} style={{opacity}} key={index}>
                            <div className={styles.img}>
                                <div className={styles.GImgContainer}><Image alt="預覽" src={"/guest_page.png"} fill sizes="100%" style={{ objectFit: 'cover' }}/></div>
                                <div className={styles.GImgContainer}><Image alt="預覽" src={"/guest_booking.png"} fill sizes="100%" style={{ objectFit: 'cover' }}/></div>
                            </div>
                            <div className={styles.text}>{DisplayBlock[index].content.split('\n').map((line,i)=>(<span key={i}>{line}<br/></span>))}</div>
                        </animated.div>
                    )
                }
            })}
        </section>
    )}
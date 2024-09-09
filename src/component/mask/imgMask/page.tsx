"use client"

import { StopPropogation } from "@/lib/stopPropagation"
import styles from "./page.module.css"
import { SetStateAction } from "react"
import Image from "next/image"

export default function ImgMask({setOpen,src}:{setOpen:React.Dispatch<SetStateAction<boolean>>,src:string}){
    const handleClick = ()=>{
        setOpen(false)
    }
    return(
        <div className={styles.mask} onClick={handleClick}>
            <div className={styles.container} onClick={StopPropogation}>
                <Image alt="大圖" src={src} fill sizes="100%" style={{objectFit:"cover",zIndex:202}}/>
            </div>
        </div>
    )
}
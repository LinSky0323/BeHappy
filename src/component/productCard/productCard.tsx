"use client"

import Image from "next/image"
import styles from "./productCard.module.css"
import { useState } from "react"
import ImgMask from "../mask/imgMask/page"

export default function ProductCard({description,src}:{description:string,src:string}){
    const [open,setOpen] = useState(false)
    const handleClick = ()=>{
        setOpen(true)
    }

    return(
        <>
        {open && <ImgMask setOpen = {setOpen} src = {src}/>}
        <div className={styles.container}>
            
            <div className={styles.image} onClick={handleClick}>
                <Image src={src} alt={description} fill sizes="100%" style={{ objectFit: 'cover' }}/>
            </div>
            <div className={styles.title}>
                <div>{description}</div>
            </div>
            
        </div>
        </>
    )
}
"use client"

import Image from "next/image"
import styles from "./productCard.module.css"

export default function ProductCard({description,src}:{description:string,src:string}){

    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src={src} alt={description} fill sizes="100%"/>
            </div>
            <div className={styles.title}>
                <div>{description}</div>
            </div>
            
        </div>
    )
}
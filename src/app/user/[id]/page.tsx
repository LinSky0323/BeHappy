"use client"
import { useContext } from "react"
import { IdentityContext } from "./layout"
import { guestNavList,tradeNavlist } from "./layout"
import styles from "./page.module.css"
import BigButton from "@/component/button/bigButton/page"


export default function User(){
    const identityCtx:any = useContext(IdentityContext)
    const {identity,setIdentity} = identityCtx
    return(
        <main className={styles.container}>
        {(identity===1?guestNavList:tradeNavlist).map((item,index)=>(
            <BigButton key={index} content={item.name} target = {item.id} img = {item.img}/>
        ))}
        </main>
    )
    
}
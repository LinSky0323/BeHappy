"use client"
import PayMask from "@/component/mask/payMask/page"
import styles from "./page.module.css"
import Script from "next/script"


export default function LevelupModel(){
    return(
        <div>
            <Script src="https://js.tappaysdk.com/sdk/tpdirect/v5.18.0"  strategy="afterInteractive"  onLoad={()=>console.log(123)} />
            <PayMask/>
        </div>
    )
}
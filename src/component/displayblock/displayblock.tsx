"use client"
import styles from "./displayblock.module.css"
import ProductCard from "../productCard/productCard"
import RightButton from "../button/rightButton/rightButton"
import LeftButton from "../button/leftButton/leftButton"
import { useState } from "react"

interface displayState{
    [type:string]:[{[description:string]:string},{[src:string]:string}]
}

export default function DisplayBlock({data}:{data:any}){
    const [highLight,setHighLight] = useState(0)
    const testData:[displayState] = data.displayList
    const testTitle:string[][] = testData.map((item:object)=>(Object.keys(item)))
    const clickCircle = (index:number)=>{
        const gap = index - highLight;
        const list = document.querySelector("#displayBlock__listContainer")
        const title = document.querySelector("#displayBlock__titleContainer")
        if(list && title){
            if(window.innerWidth>800){list.scrollBy({left:1000*gap,behavior:"smooth"})}
            else if(window.innerWidth>600){list.scrollBy({left:500*gap,behavior:"smooth"})}
            else {list.scrollBy({left:200*gap,behavior:"smooth"})}title.scrollBy({left:150*gap,behavior:"smooth"})
            setHighLight(index)
        }
    }
    return(
        <div className={styles.container} id="displayBlock">
            <div className={styles.titleContainer} id="displayBlock__titleContainer">
                {testTitle.map((item,index)=>(
                    <div className={`${styles.title} ${(index===highLight) && styles.highLight}`} key={index}>{item}</div>
                ))}
            </div>
            {/* <div className={styles.title}>測試</div> */}
            <LeftButton setHighLight={setHighLight} length={testData.length} highLight={highLight}/>
            <div className={styles.listContainer} id="displayBlock__listContainer">
                {testData.map((item,index)=>(
                    <div className={`${styles.list} ${(index===highLight) && styles.highLight}`} key={index}>
                        {Object.values(item)[0].map((i:any,inde:number)=>(
                            <ProductCard description={i["description"]} src={i["src"]} key={inde}/>
                        ))}
                    </div>
                ))}
            </div>
            <RightButton setHighLight={setHighLight} length={testData.length} highLight={highLight}/>
            <div className={styles.circleContainer}>
                {testTitle.map((item,index)=>(
                    <div key={index} className={`${styles.circle} ${(index===highLight) && styles.highCircle}`}
                    onClick={()=>clickCircle(index)}></div>
                ))}
            </div>
        </div>
    )
}
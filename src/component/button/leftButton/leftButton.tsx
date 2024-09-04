"use client"
import styles from "./leftButton.module.css"

export default function LeftButton({setHighLight,length,highLight}:{setHighLight:React.Dispatch<React.SetStateAction<number>>,length:number,highLight:number}){
    const handleClick = ()=>{
        const list = document.querySelector("#displayBlock__listContainer")
        const title = document.querySelector("#displayBlock__titleContainer")
        if(list && title){
            if(highLight>0){
                if(window.innerWidth>800){list.scrollBy({left:-1000,behavior:"smooth"})}
                else if(window.innerWidth>600){list.scrollBy({left:-500,behavior:"smooth"})}
                else{list.scrollBy({left:-200,behavior:"smooth"})}
                title.scrollBy({left:-150,behavior:"smooth"})
                setHighLight(highLight-1)
            }
            else{
                if(window.innerWidth>800){list.scrollBy({left:(1000*(length-1)),behavior:"smooth"})}
                else if(window.innerWidth>600){list.scrollBy({left:(500*(length-1)),behavior:"smooth"})}
                else{list.scrollBy({left:(200*(length-1)),behavior:"smooth"})}
                title.scrollBy({left:(150*(length-1)),behavior:"smooth"})
                setHighLight(length-1)
            }
        }
    }
    return(
        <>
        <div className={styles.circle} onClick={handleClick}>
            <div className={styles.arrow}></div>
        </div>
        </>
    )
}
"use client"
import styles from "./rightButton.module.css"

export default function RightButton({setHighLight,length,highLight}:{setHighLight:React.Dispatch<React.SetStateAction<number>>,length:number,highLight:number}){
    const handleClick = ()=>{
        const list = document.querySelector("#displayBlock__listContainer")
        const title = document.querySelector("#displayBlock__titleContainer")
        if(list && title){
            if(highLight<length-1){
                list.scrollBy({left:1000,behavior:"smooth"})
                title.scrollBy({left:150,behavior:"smooth"})
                setHighLight(highLight+1)
            }
            else{
                list.scrollBy({left:(-1000*(length-1)),behavior:"smooth"})
                title.scrollBy({left:(-150*(length-1)),behavior:"smooth"})
                setHighLight(0)
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
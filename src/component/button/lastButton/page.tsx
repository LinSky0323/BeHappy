"use client"
import styles from "./page.module.css"

export function LastButton({url}:{url:string}){
    const handleClick = ()=>{
        const targetDiv = document.querySelector(`#${url}`)
        const scrollDiv = document.querySelector("#scrollContainer")
        if(targetDiv && scrollDiv){
            const high = targetDiv.getBoundingClientRect().top
            scrollDiv.scrollTo({
                top:high-145,
                behavior:"smooth"
            })
        }

    }
    return(
        <button className={styles.button} onClick={handleClick}>上一步</button>
    )
}
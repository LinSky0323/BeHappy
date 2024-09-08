"use client"
import styles from "./page.module.css"

export function NextButton({url}:{url:string}){

    const handleClick = ()=>{
        const targetDiv = document.querySelector(`#${url}`)
        const scrollDiv = document.querySelector("#scrollContainer")
        if(targetDiv && scrollDiv){
            const high = targetDiv.getBoundingClientRect().top
            const now = scrollDiv.scrollTop
            console.log(now,high)
            scrollDiv.scrollTo({
                top:now+high-145,
                behavior:"smooth"
            })
        }
    }
    return(
        <button className={styles.button} onClick={handleClick}>下一步</button>
    )
}
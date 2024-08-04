"use client"
import styles from "./navbar.module.css"

export default function Navbar({list}:{list:{name:string,id:string}[]}){
    const handleClick = (item:{name:string,id:string},e:React.MouseEvent<HTMLDivElement>)=>{
        const targetDiv = document.querySelector(`#${item.id}`)
        if(targetDiv){
            const targetHigh = targetDiv.getBoundingClientRect().top
            const offset = -50
            const position = targetHigh+offset+window.scrollY
            window.scrollTo({
                top:position,
                behavior:"smooth"
            })
        }
    }
    return(
        <div className={styles.bar}>
        {list.map((item,index)=>(
            <div key={index} className={styles.item} onClick={(e)=>handleClick(item,e)}>{item.name}</div>
        ))}
        </div>
    )
}
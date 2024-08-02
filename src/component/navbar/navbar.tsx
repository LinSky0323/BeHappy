"use client"
import styles from "./navbar.module.css"

export default function Navbar({list}:{list:string[]}){

    return(
        <div className={styles.bar}>
        {list.map((item,index)=>(
            <div key={index} className={styles.item}>{item}</div>
        ))}
        </div>
    )
}
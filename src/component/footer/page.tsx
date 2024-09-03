import Link from "next/link"
import styles from "./page.module.css"

export default function Footer(){
    return(
        <div className={styles.container}>
            <div>
            <span>©2024 </span>
            <Link href={"/"} className={styles.link}>Be-Happy</Link>
            </div>
            <div>
            Designed & built by Ken. Powered by – Vercel, Next, React-spring, Firebase & more...
            </div>
        </div>
    )
}
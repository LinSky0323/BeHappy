import styles from "./header.module.css"
import Navbar from "../navbar/navbar"
import Sign from "../sign/sign"

export default function Header({title,username}:{title:string,username?:string|null}){

    return(
        <header className={styles.header}>
            <h1 className={styles.name}>{title}</h1>
            <Sign/>
            <div className={styles.mask}>
                <Navbar list={["簡介","使用產品","作品展示","預約"]}/>
                <div className={styles.username}>{username}</div>
            </div>
            <div className={styles.circle}> </div>
        </header>
    )
}
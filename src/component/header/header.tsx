import styles from "./header.module.css"
import Navbar from "../navbar/navbar"
import Sign from "../sign/sign"

export default function Header({title,username}:{title:string,username?:string|null}){
    const testList = [{name:"簡介",id:"introduce"},{name:"使用產品",id:""},{name:"作品展示",id:"displayBlock"},{name:"預約",id:"bookingList"}]
    return(
        <header className={styles.header}>
            <h1 className={styles.name}>{title}</h1>
            <Sign/>
            <div className={styles.mask}>
                <Navbar list={testList}/>
                <div className={styles.username}>{username}</div>
            </div>
            <div className={styles.circle}> </div>
        </header>
    )
}
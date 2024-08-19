import styles from "./header.module.css"
import Navbar from "../bar/navbar/navbar"
import Sign from "../sign/sign"
import Link from "next/link"

export default   function Header({title="",username="",data,navList}:{title?:string,username?:string|null,data?:any,navList?:any}){
    
    return(
        <header className={styles.header}>
            <Link href="/" ><h1 className={styles.name} >{`${title===""?data.titleName:title}`}</h1></Link>
            <Sign/>
            <div className={styles.mask}>
                <Navbar list={navList}/>
                <div className={styles.username}>{`${username===""?"by."+data.writerName:username}`}</div>
            </div>
            <div className={styles.circle}></div>
        </header>
    )
}
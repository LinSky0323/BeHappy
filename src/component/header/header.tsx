import styles from "./header.module.css"
import Navbar from "../bar/navbar/navbar"
import Sign from "../sign/sign"
import Link from "next/link"

export default   function Header({title="",username,data,navList}:{title?:string,username?:string|null,data?:any,navList?:any}){
    return(
        <header className={styles.header}>
            <video id="background-video" autoPlay muted loop playsInline style={{position: "absolute",top:"0",left:"0",width:"100%",height:"100%",objectFit:"cover",zIndex:"-1"}}>
                <source src = "https://video.wixstatic.com/video/e4f166_77aba0bb771148d490d97b40c244bf8a/1080p/mp4/file.mp4" type="video/mp4"/>
            </video>
            <Link href="/" className={styles.name}><h1 className={styles.name} >{`${title===""?data.titleName:title}`}</h1></Link>
            <Sign/>
            {navList.length===0? null: 
                <div className={styles.mask}>
                <Navbar list={navList}/>
                </div>
            }
            
            <div className={styles.username}>{`${username?"":"by."+data.writerName}`}</div>
        </header>
    )
}
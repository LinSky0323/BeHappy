import Image from "next/image";
import mysvg from "../../../../../public/loading.svg"
import styles from "./loading.module.css"
export default function Loading(){
    return(
        <div className={styles.container}>Loading
            <div className={styles.circle}><Image alt="loading" src={mysvg} width={30} height={30} priority/></div>
        </div>
    )
}
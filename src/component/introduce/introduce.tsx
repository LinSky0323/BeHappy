import Image from "next/image"
import styles from "./introduce.module.css"

export default function Introduce({src,description}:{src:string,description:string}){
    return(
        <section className={styles.container} id="introduce">
            <h2 className={styles.h2}>簡介</h2>
            <div className={styles.content}>
                <div>
                    <div className={styles.image}>
                        <Image src={src} alt="not find" fill priority
                        sizes="270px"/>
                    </div>
                </div>
                <div className={styles.description}>{description}</div>
            </div>
        </section>
    )
}
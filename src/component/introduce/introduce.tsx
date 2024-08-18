import Image from "next/image"
import styles from "./introduce.module.css"

export default async function Introduce({data}:{data:any}){
    return(
        <section className={styles.container} id="introduce">
            <h2 className={styles.h2}>簡介</h2>
            <div className={styles.content}>
                <div>
                    <div className={styles.image}>
                        <Image src={data.introduceImage} alt="not find" fill priority
                        sizes="270px"/>
                    </div>
                </div>
                <div className={styles.description}>{data.introduceContent.map((item:any,index:any)=>(
                    <div key={index}>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{item}</div>
                ))}</div>
            </div>
        </section>
    )
}
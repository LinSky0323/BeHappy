import styles from "./title.module.css"

export default function FormTitle({name}:{name:string}){
    return (
        <h2 className={styles.h2}>{name}</h2>
    )
}
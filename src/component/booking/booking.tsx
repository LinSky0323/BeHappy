import Schedule from "../schedule/schedule"
import styles from "./booking.module.css"

export default function Booking(){

    return(
        <section className={styles.container}>
            <div className={styles.title}>預約</div>
            <Schedule/>
        </section>
    )
}
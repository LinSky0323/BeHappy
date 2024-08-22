"use client"
import styles from "./daySchedule.module.css"


export default function DayScheduleOut({list,chooseday}:{list:any,chooseday:any}){
    const hours1 = [0,100,200,300,400,500,600,700,800,900,1000,1100]
    const hours2 = [1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300]
    const { year, month, day } = chooseday;

    return (
        <section className={styles.container}>

            <table className={styles.table} >
                <thead>
                    <tr>
                        <th colSpan={4}>時間</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                    {hours1.map((item)=>(
                                        <tr key={item}>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && styles.choose}`} data-content={item}
                                            
                                            >{item/100}:00</td>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && styles.choose}`} data-content={item+50}
                                            
                                            >{Math.floor(item/100)}:30</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                {hours2.map((item)=>(
                                        <tr key={item}>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && styles.choose}`} data-content={item}
                                            
                                            >{item/100}:00</td>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && styles.choose}`} data-content={item+50}
                                            
                                            >{Math.floor(item/100)}:30</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
                
                

            </table>

            
        </section>
    )
}
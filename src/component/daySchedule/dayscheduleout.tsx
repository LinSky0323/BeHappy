"use client"
import styles from "./daySchedule.module.css"


export default function DayScheduleOut({list,chooseday}:{list:any,chooseday:any}){
    const hours1 = [0,1,2,3,4,5,6,7,8,9,10,11]
    const hours2 = [12,13,14,15,16,17,18,19,20,21,22,23]
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
                                            
                                            >{item}:00</td>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+0.5]) && styles.choose}`} data-content={item+0.5}
                                            
                                            >{Math.floor(item/1)}:30</td>
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
                                            
                                            >{item}:00</td>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+0.5]) && styles.choose}`} data-content={item+0.5}
                                            
                                            >{Math.floor(item/1)}:30</td>
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
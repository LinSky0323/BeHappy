"use client"
import { SetStateAction } from "react";
import styles from "./daySchedule.module.css"


export default function DayScheduleBooking({list,chooseday,hours,setHours,thisItem,remind}:{list:any,chooseday:any,hours:number[],setHours:React.Dispatch<SetStateAction<number[]>>,thisItem:any,remind:any}){
    const hours1 = [0,100,200,300,400,500,600,700,800,900,1000,1100]
    const hours2 = [1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300]
    const { year, month, day } = chooseday;
    const acounts = thisItem.hours.length
    const clickHour = (start:number)=>{
        let ok = true;
        for(let i=0;i<acounts;i++){
            try{
                if(Object.keys(list[year][month][day][start+i*50]).length && !(year===thisItem.year&&month===thisItem.month&&day===thisItem.day&&thisItem.hours.includes(start+(i*50)))){
                    ok = false
                    remind.setRemind("時間不足")
                    return
                }
            }
            catch{
                remind.setRemind("時間不足")
                return
            }
        }
        let newArray = []
        if(ok){
            for(let i=0;i<acounts;i++){
                newArray.push(start+i*50)
            }
            setHours(newArray)
        }
    }

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
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && styles.has}
                                            ${(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item)) && styles.thisItem}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& (Object.keys(list[year][month][day][item]).length&& !(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item))) ) && styles.already}
                                            ${hours.includes(item) && styles.choose}`} data-content={item}
                                            onClick={((list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && (!Object.keys(list[year][month][day][item]).length || (thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item))))?()=>clickHour(item):undefined}
                                            >{item/100}:00</td>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && styles.has}
                                            ${(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item+50)) && styles.thisItem}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& (Object.keys(list[year][month][day][item+50]).length&& !(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item+50))) ) && styles.already}
                                             ${hours.includes(item+50) && styles.choose}`} data-content={item+50}
                                            onClick={((list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && (!Object.keys(list[year][month][day][item+50]).length || (thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item+50))))?()=>clickHour(item+50):undefined}
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
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && styles.has}
                                            ${(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item)) && styles.thisItem}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& (Object.keys(list[year][month][day][item]).length&& !(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item))) ) && styles.already} 
                                             ${hours.includes(item) && styles.choose}`} data-content={item}
                                            onClick={((list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && (!Object.keys(list[year][month][day][item]).length || (thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item))))?()=>clickHour(item):undefined}
                                            >{item/100}:00</td>
                                            <td className={`${styles.td} 
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && styles.has}
                                            ${(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item+50)) && styles.thisItem}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& (Object.keys(list[year][month][day][item+50]).length&& !(thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item+50))) ) && styles.already} 
                                             ${hours.includes(item+50) && styles.choose}`} data-content={item+50}
                                            onClick={((list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && (!Object.keys(list[year][month][day][item+50]).length || (thisItem.year===year && thisItem.month===month && thisItem.day===day &&thisItem.hours.includes(item+50))))?()=>clickHour(item+50):undefined}
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
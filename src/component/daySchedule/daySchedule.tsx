"use client"
import { SelectHour } from "@/lib/selectDay"
import styles from "./daySchedule.module.css"
import { useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList } from "@/lib/store/features/userBuildSlices"
import { time } from "console"


export default function DaySchedule({hourList,setHourList,selectHour,rerenderkey,setRerenderkey}:{hourList:any,setHourList:React.Dispatch<React.SetStateAction<object>>,selectHour:any,rerenderkey:number,setRerenderkey:React.Dispatch<React.SetStateAction<number>>}){
    const buildList = useUserBuildSelector(selectBuildList)
    const hours1 = [0,100,200,300,400,500,600,700,800,900,1000,1100]
    const hours2 = [1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300]
    const checkSelect = ()=>{
        if(selectHour.isClick){
            selectHour.handleMouseUp()
            setHourList(selectHour.selectHour)
        }
    }
    return (
        <section className={styles.container} key={rerenderkey}>

            <table className={styles.table} onMouseLeave={checkSelect}>
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
                                            <td className={styles.td} data-content={item}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
                                            >{item/100}:00</td>
                                            <td className={styles.td} data-content={item+50}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
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
                                            <td className={styles.td} data-content={item}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
                                            >{item/100}:00</td>
                                            <td className={styles.td} data-content={item+50}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
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
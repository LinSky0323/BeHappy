"use client"
import { SelectHour } from "@/lib/selectDay"
import styles from "./daySchedule.module.css"
import { useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList } from "@/lib/store/features/userBuildSlices"
import { time } from "console"


export default function DaySchedule({hourList,setHourList,selectHour,rerenderkey,setRerenderkey}:{hourList:any,setHourList:React.Dispatch<React.SetStateAction<object>>,selectHour:any,rerenderkey:number,setRerenderkey:React.Dispatch<React.SetStateAction<number>>}){
    const buildList = useUserBuildSelector(selectBuildList)
    const hours1 = [0,1,2,3,4,5,6,7,8,9,10,11]
    const hours2 = [12,13,14,15,16,17,18,19,20,21,22,23]
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
                                            >{item}:00</td>
                                            <td className={styles.td} data-content={item+0.5}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
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
                                            <td className={styles.td} data-content={item}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
                                            >{item}:00</td>
                                            <td className={styles.td} data-content={item+0.5}
                                            onMouseDown={(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
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
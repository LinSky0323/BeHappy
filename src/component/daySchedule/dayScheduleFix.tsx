"use client"
import styles from "./daySchedule.module.css"
import { useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList } from "@/lib/store/features/userBuildSlices"
import { useEffect } from "react"



export default function DayScheduleFix({hourList,setHourList,selectHour,rerenderkey,setRerenderkey,list,chooseday}:{hourList:any,setHourList:React.Dispatch<React.SetStateAction<object>>,selectHour:any,rerenderkey:number,setRerenderkey:React.Dispatch<React.SetStateAction<number>>,list:any,chooseday:any}){
    const buildList = useUserBuildSelector(selectBuildList)
    const hours1 = [0,100,200,300,400,500,600,700,800,900,1000,1100]
    const hours2 = [1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300]
    const checkSelect = ()=>{
        if(selectHour.isClick){
            selectHour.handleMouseUp()
            setHourList(selectHour.selectHour)
        }
    }
    useEffect(()=>{
        if(list[chooseday.year]&&list[chooseday.year][chooseday.month]&&list[chooseday.year][chooseday.month][chooseday.day]){
            const array = Object.keys(list[chooseday.year][chooseday.month][chooseday.day])
            const obj:any = {}
            array.forEach((item)=>{
                obj[item] = list[chooseday.year][chooseday.month][chooseday.day][item]
            })
            setHourList(obj)
            selectHour.setValue(obj)
        }
    },[chooseday])
    const {year,month,day} = chooseday
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
                                            <td className={`${styles.td}  ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && styles.choose}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& Object.keys(list[year][month][day][item]).length)&& styles.already}`} data-content={item}
                                            onMouseDown={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& Object.keys(list[year][month][day][item]).length)?undefined:(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& Object.keys(list[year][month][day][item]).length)?undefined:(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
                                            >{item/100}:00</td>
                                            <td className={`${styles.td} ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && styles.choose}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& Object.keys(list[year][month][day][item+50]).length)&& styles.already}`} data-content={item+50}
                                            onMouseDown={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& Object.keys(list[year][month][day][item+50]).length)?undefined:(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& Object.keys(list[year][month][day][item+50]).length)?undefined:(e)=>selectHour.handleMouseOver(e)}
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
                                            <td className={`${styles.td}  ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]) && styles.choose}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& Object.keys(list[year][month][day][item]).length)&& styles.already}`} data-content={item}
                                            onMouseDown={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& Object.keys(list[year][month][day][item]).length)?undefined:(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item]&& Object.keys(list[year][month][day][item]).length)?undefined:(e)=>selectHour.handleMouseOver(e)}
                                            onMouseUp={checkSelect}
                                            >{item/100}:00</td>
                                            <td className={`${styles.td} ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]) && styles.choose}
                                            ${(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& Object.keys(list[year][month][day][item+50]).length)&& styles.already}`} data-content={item+50}
                                            onMouseDown={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& Object.keys(list[year][month][day][item+50]).length)?undefined:(e)=>selectHour.handleMouseDown(e)}
                                            onMouseEnter={(list[year]&&list[year][month]&&list[year][month][day]&&list[year][month][day][item+50]&& Object.keys(list[year][month][day][item+50]).length)?undefined:(e)=>selectHour.handleMouseOver(e)}
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
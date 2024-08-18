"use client"
import { usePersonPageDispatch, usePersonPageSelector } from "@/lib/store/hooks"
import styles from "./schedule.module.css"
import { useEffect, useState } from "react"
import { selectbookingList, setbookingListTime } from "@/lib/store/features/personPageSlices"

export default function Schedule({timeList,chooseDay,setChooseDay}:{timeList:any,chooseDay:string[],setChooseDay:React.Dispatch<React.SetStateAction<string[]>>}){
    const Day = new Date()
    const [thisMonth,setThisMonth] = useState(Day.getMonth()+1)
    const [thisYear,setThisYear] = useState(Day.getFullYear())
    let delay:boolean = false;
    if(Day.getMonth()>=thisMonth && Day.getFullYear()>=thisYear){
        delay = true;
    }
    const dispatch = usePersonPageDispatch()
    const bookingList = usePersonPageSelector(selectbookingList)
    const listYear = Day.getFullYear()
    const firstWeek = (new Date(thisYear,thisMonth-1,1)).getDay()
    const months:string[] = [
        "一月", "二月", "三月", "四月", "五月", "六月",
        "七月", "八月", "九月", "十月", "十一月", "十二月"
    ];
    const days:number[] = ((thisYear%4===0 && thisYear%100 !==0) ?[31,29,31,30,31,30,31,31,30,31,30,31]:[31,28,31,30,31,30,31,31,30,31,30,31])
    const daysOfWeek:string[] = ["日", "一", "二", "三", "四", "五", "六"];
    const day = days[thisMonth-1]
    const weeks = Math.ceil((firstWeek+day)/7)
    const array1:any[] = new Array(firstWeek).fill('')
    const mainArray:any[] = []
    for(let i=1;i<=day;i++){
        mainArray.push(i)
    }
    const array2:any[] = new Array((weeks*7-firstWeek-day)).fill('')
    const result = (array1.concat(mainArray)).concat(array2);

    const handlechange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const month:number = e.target.selectedIndex+1;
        setThisMonth(month)
    }
    const handlechangeyear = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const year:number = parseInt(e.target.value);
        setThisYear(year)
    }
    const handleClick=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLDivElement;
        dispatch(setbookingListTime([thisYear,thisMonth,parseInt(target.innerText)]))
    }
    return(
        <div className={styles.account__container}>
            <select onChange={handlechangeyear} className={styles.data__list} value={thisYear}> 
                <option>{listYear}</option>
                <option>{listYear+1}</option>
            </select>
            <select onChange={handlechange} className={styles.data__list} value={months[thisMonth-1]}> 
            {months.map((item)=>{
                return <option key={item} >{item}</option>
            })}
            </select>
            <section className={styles.date__container}>
                {daysOfWeek.map((item)=>{
                    return <div key={item} className={styles.date__week}>{item}</div>
                })}
                {result.map((item,index)=>{
                    return <div key={index} className={`${styles.date__item} ${((parseInt(item)===Day.getDate()) && (thisMonth===Day.getMonth()+1)) && (thisYear===listYear) && styles.date__today} 
                    ${(delay ||(thisMonth===Day.getMonth()+1 && (parseInt(item)<Day.getDate())))&& styles.delay}
                    ${(timeList[thisYear] && timeList[thisYear][thisMonth] && timeList[thisYear][thisMonth][item]) && styles.isset}
                    ${(bookingList.time && bookingList.time[0]===thisYear && bookingList.time[1]===thisMonth&& bookingList.time[2]===item)&&styles.choose}`}
                    onClick={(delay ||(thisMonth===Day.getMonth()+1 && (parseInt(item)<=Day.getDate())))?undefined:(e)=>handleClick(e)} >{item}</div>
                })}
            </section>

        </div>
    )
}
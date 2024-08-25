"use client"
import styles from "./timeForm.module.css"
import DaySchedule from "@/component/daySchedule/daySchedule"
import DayScheduleOut from "@/component/daySchedule/dayscheduleout"
import ScheduleIn from "@/component/schedule/schedulein"
import ScheduleOut from "@/component/schedule/scheduleout"
import {  getTimeData, setTimeData,  } from "@/lib/firebase/firestore"
import { SelectDay, SelectHour } from "@/lib/selectDay"
import {  selectTimeList, setTime } from "@/lib/store/features/userBuildSlices"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { useEffect, useState } from "react"

    
const selectDay = new SelectDay()
const selectHour = new SelectHour() 

export default function TimeForm(){
    const dispatch = useUserBuildDispatch()
    const timelist = useUserBuildSelector(selectTimeList)
    const [ischeck,setIscheck] = useState(false)
    const [timeList,setTimelist] = useState<Record<string, any>>({})
    const [hourList,setHourList] = useState<Record<string, any>>({})
    const [list,setList] = useState(timelist);
    const [rerenderkey,setRerenderkey] = useState(0)
    const [chooseday,setChooseday] = useState({})
    const uid = localStorage.getItem("uid") as string
    useEffect(()=>{
        if(!Object.keys(timelist).length){
            getTimeData(uid).then((item)=>{
                if(item){
                    dispatch(setTime(item))
                    setList(item)
                }
            })
        }
    },[])
    const clicknocheck = ()=>{
        setIscheck(false)
    }
    const clickcheck = ()=>{
        setIscheck(true)
    }

    const pushandreset = async(itemlist:object)=>{
        const res = await setTimeData(uid,itemlist)
        setRerenderkey(rerenderkey+1)
        dispatch(setTime(itemlist))
        setList(itemlist)
        selectDay.reset()
        selectHour.reset()
    }

    const handleclick = async()=>{
        const newDays = {...timeList}
        const newHours = {...hourList}

        try{
            if(!Object.keys(newHours)[0]){throw "沒選時間"}
            const newList = JSON.parse(JSON.stringify(list));
            const year = Object.keys(newDays)[0]
            const month = Object.keys(newDays[year])[0]
            Object.keys(newDays[year][month]).forEach((item)=>{
                newDays[year][month][item] = newHours
            })
            try{
                Object.keys(newDays[year][month]).forEach((item)=>{
                    newList[year][month][item] = newDays[year][month][item]
                })
                pushandreset(newList)
            }
            catch(err){
                if(newList[year]){
                    newList[year][month] = newDays[year][month]
                    pushandreset(newList)
                }
                else{
                    newList[year] = newDays[year]
                    pushandreset(newList)
                }
            }
        }
        catch(error){
            console.log(error)
        }
        
    }
    const handleclickremove = async()=>{
        const newDays = {...timeList}
        try{
            const newList = JSON.parse(JSON.stringify(list));
            const year = Object.keys(newDays)[0]
            const month = Object.keys(newDays[year])[0]
            Object.keys(newDays[year][month]).forEach((item)=>{
                delete newList[year][month][item]
            })
            pushandreset(newList)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div> 
            <button className={ischeck?`${styles.button}`:`${styles.button}  ${styles.highbutton}`} onClick={clicknocheck}>編輯</button>
            <button className={ischeck?`${styles.button} ${styles.rightbutton}  ${styles.highbutton}`:`${styles.button} ${styles.rightbutton}`} onClick={clickcheck}>查詢</button>
            {ischeck
            ?<div className={styles.container}>
            <ScheduleOut list = {list} chooseday = {chooseday}  setChooseday = {setChooseday}/>
            <DayScheduleOut list = {list}  chooseday = {chooseday}/>
            </div>
            :<><div className={styles.container}>
            <ScheduleIn timeList={timeList} setTimeList={setTimelist} selectDay={selectDay} selectHour = {selectHour}  rerenderkey = {rerenderkey} setRerenderkey = {setRerenderkey} setHourList = {setHourList} list = {list}/>
            <DaySchedule hourList={hourList} setHourList={setHourList} selectHour = {selectHour}  rerenderkey = {rerenderkey} setRerenderkey = {setRerenderkey} /></div>
            <div className={styles.btnContainer}>
                <button className={styles.checkbtn} onClick={handleclickremove}>清除</button>
                <button className={styles.checkbtn} onClick={handleclick}>設定  </button>
            </div>
            </>}
            
        </div>
    )
}
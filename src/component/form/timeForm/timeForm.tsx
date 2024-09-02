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
import React, { SetStateAction, useEffect, useState } from "react"
import {useSpring,animated } from "@react-spring/web"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import DayScheduleFix from "@/component/daySchedule/dayScheduleFix"
    
const selectDay = new SelectDay()
const selectHour = new SelectHour() 
const from = ()=>({x:0})
const to = ()=>({x:86.8})
const to2 = ()=>({x:173.6})
export default function TimeForm({ischeck,setIscheck}:{ischeck:number,setIscheck:React.Dispatch<SetStateAction<number>>}){
    const [prop,api] = useSpring(()=>({
        from
    }))
    const ramind = useChangeRemind()
    const remind = useChangeRemind()
    const dispatch = useUserBuildDispatch()
    const timelist = useUserBuildSelector(selectTimeList)
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
        api.start(()=>from())
    },[])
    const clicknocheck = ()=>{
        setIscheck(0)
        setTimelist({})
        setHourList({})
        setChooseday({})
        selectDay.reset()
        selectHour.reset()
        api.start(()=>from())
    }
    const clickfix = ()=>{
        setIscheck(1)
        setTimelist({})
        setHourList({})
        setChooseday({})
        selectDay.reset()
        selectHour.reset()
        api.start(()=>to())
    }
    const clickcheck = ()=>{
        setIscheck(2)
        setTimelist({})
        setHourList({})
        setChooseday({})
        selectDay.reset()
        selectHour.reset()
        api.start(()=>to2())
    }

    const pushandreset = async(itemlist:object)=>{
        const res = await setTimeData(uid,itemlist)
        setRerenderkey(rerenderkey+1)
        dispatch(setTime(itemlist))
        setList(itemlist)
        selectDay.reset()
        selectHour.reset()
    }
    const handlefix = ()=>{
        const {year,month,day} = chooseday as any
        const newHours = {...hourList}
        if(!day){
            remind.setRemind("沒選日期")
            return
        }
        if(!Object.keys(newHours).length){
            remind.setRemind("沒設定時間")
            return
        }
        const newList = JSON.parse(JSON.stringify(list));
        newList[year][month][day] = newHours
        console.log(newList)
        try{
            pushandreset(newList)
            remind.setRemind("修改成功")
        }
        catch(error){
            console.log(error)
            remind.setRemind("修改失敗")
        }
    }
    const handleclick = async()=>{
        const newDays = {...timeList}
        const newHours = {...hourList}

        try{
            if(!Object.keys(newHours)[0]){
                remind.setRemind("沒選時間")
                return
            }
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
            remind.setRemind("編輯失敗")
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
            remind.setRemind("清除失敗")
        }
    }

    return(
        <div> 
            <div className={styles.toggleBtn}>
                <animated.div className={styles.toggleMask} style={{x:prop.x,left:"0px"}}></animated.div>
                <div onClick={clicknocheck} className={`${styles.button} ${ischeck===0 && styles.highbutton}`}>多日編輯</div><div onClick={clickfix} className={`${styles.button} ${ischeck===1 && styles.highbutton}`}>單日修改</div><div onClick={clickcheck} className={`${styles.button} ${ischeck===2 && styles.highbutton}`}>查詢時間</div>
            </div>
            {ischeck===2
            ?<div className={styles.container}>
            <ScheduleOut list = {list} chooseday = {chooseday}  setChooseday = {setChooseday}/>
            <DayScheduleOut list = {list}  chooseday = {chooseday}/>
            </div>
            :ischeck===1?
            <>
            <div className={styles.container}>
            <ScheduleOut list = {list} chooseday = {chooseday}  setChooseday = {setChooseday}/>
            <DayScheduleFix hourList={hourList} setHourList={setHourList} selectHour = {selectHour}  rerenderkey = {rerenderkey} setRerenderkey = {setRerenderkey} list = {list} chooseday = {chooseday}/></div>
            <div className={styles.btnContainer}>
            <div className={styles.btnc}>
                <button className={styles.checkbtn} onClick={handlefix}>確認</button>
            </div>
            </div>
            {remind.state?<div className={styles.remind}>{remind.state}</div>:null}
            </>
            :
            <><div className={styles.container}>
            <ScheduleIn timeList={timeList} setTimeList={setTimelist} selectDay={selectDay} selectHour = {selectHour}  rerenderkey = {rerenderkey} setRerenderkey = {setRerenderkey} setHourList = {setHourList} list = {list}/>
            <DaySchedule hourList={hourList} setHourList={setHourList} selectHour = {selectHour}  rerenderkey = {rerenderkey} setRerenderkey = {setRerenderkey} /></div>
            <div className={styles.btnContainer}>
            <div className={styles.btnc}>
                <button className={styles.checkbtn} onClick={handleclickremove}>清空</button>
                <button className={styles.checkbtn} onClick={handleclick}>確認</button>
            </div>  
            </div>
            {remind.state?<div className={styles.remind}>{remind.state}</div>:null}
            </>}
            
        </div>
    )
}
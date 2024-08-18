"use client"
import { useFormState } from "react-dom"
import SubmitButton from "../button/submitButton/submitButton"
import Schedule from "../schedule/schedule"
import styles from "./booking.module.css"
import { usePersonPageDispatch, usePersonPageSelector } from "@/lib/store/hooks"
import { addbookingList, delbookingList, selectbookingList, setbookingListTime } from "@/lib/store/features/personPageSlices"
import { useEffect, useState } from "react"
import { checkAuth } from "@/lib/firebase/firaAuth"

interface bookingListState{
    item:string,
    price:number,
    time:number
}


const CheckList = ({data,timeList}:{data:any,timeList:any})=>{
    const testData:[bookingListState] = data.bookingList
    
    const submit = async(prevState:any, formData:FormData)=>{
        try{
            const res = await checkAuth() as any
            let acounts = 0
            if(totalTime === -1){acounts = 1}
            else if (totalTime > 0){acounts = totalTime/0.5}
            if(!bookingList.items.length && bookingList.time.length<4){
                alert("請選擇預約項目、日期、時間")
            }
            let items = ""
            bookingList.items.forEach((item)=>{
                items += (item.item+" ")
            })
            const submitItem = {guest:"afihlohsag123",item:items}
            const submitData :{year:number,month:number,day:number,hours:number[],items:string,uid:string} = {year:bookingList.time[0],month:bookingList.time[1],day:bookingList.time[2],hours:[],items,uid:res.uid}
            for(let i = 0;i<acounts;i++){
            if(timeList[bookingList.time[0]][bookingList.time[1]][bookingList.time[2]][bookingList.time[3]+(i*0.5)] && 
                !Object.keys(timeList[bookingList.time[0]][bookingList.time[1]][bookingList.time[2]][bookingList.time[3]+(i*0.5)]).length)
            {submitData.hours.push(bookingList.time[3]+(i*0.5))}
            else{
                alert("預定項目所需時間超過可預約時段長度")
                submitData.hours = []
                break
            }
            }

            console.log(submitData)
            }
        catch(error){
            alert(error)
        }
        
    }
    
    const [state,formAction] = useFormState(submit,null)
    const dispatch = usePersonPageDispatch()
    const bookingList = usePersonPageSelector(selectbookingList)
    const handleChange = (item:{
        item:string,
        price:number,
        time:number
    },e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            dispatch(addbookingList(item))
        }
        else{
            dispatch(delbookingList(item))
        }
    }
    let totalPrice:number = 0;
    for(let i of bookingList.items){
        if(i.time===0){
            totalPrice = -1
            break
        }
        totalPrice += i.price
    }
    let totalTime = 0;
    for(let i of bookingList.items){
        if(i.time===0){
            totalTime = -1
            break
        }
        totalTime += i.time
    }

    return(
        <div className={styles.bookingList} id="bookingList">
            <h1 className={styles.h1}>預約項目</h1>
            <form className={styles.form} action={formAction}>
                {testData.map((item,index)=>(
                    <div key={index}>
                        <input type="checkbox" onChange={(e)=>handleChange(item,e)}></input>
                        <label >{item["item"]}:{item["price"]===0?"":item["price"]}</label>
                    </div>
                ))}
                <div className={styles.time}>預估需要時間：{totalTime===-1?"視情況而定":`${totalTime}小時`}</div>
                <div className={styles.price}>預估總金額：{totalPrice===-1?"視情況而定":`${totalPrice}元`}</div>
                <div className={styles.btn} ><SubmitButton name="預定"/></div>

            </form>
        </div>
    )
}

export default function Booking({data,timeList}:{data:any,timeList:any}){
    const [chooseDay,setChooseDay] = useState<string[]>([])
    const dispatch = usePersonPageDispatch()
    const clickitem = usePersonPageSelector(selectbookingList)
    const timeitem = clickitem.time 
    let hourList = {}
    const morning:object[] = []
    const afternoon:object[] = []
    const evening:object[] = []
    const night:object[] = []
    if(timeitem[0]){
        if(timeList[timeitem[0]] && timeList[timeitem[0]][timeitem[1]] && timeList[timeitem[0]][timeitem[1]][timeitem[2]]){
            hourList = timeList[timeitem[0]][timeitem[1]][timeitem[2]]
        }
        else{
            hourList = {}
        }
    }
    if(Object.keys(hourList).length){
        const hourarray = Object.keys(hourList).sort((a,b)=>Number(a)-Number(b))
        hourarray.forEach((item)=>{
            if(Number(item) < 6){night.push({[item]:timeList[timeitem[0]][timeitem[1]][timeitem[2]][item]})}
            else if (Number(item) >= 6 && Number(item) < 12){morning.push({[item]:timeList[timeitem[0]][timeitem[1]][timeitem[2]][item]})}
            else if (Number(item) >= 12 && Number(item) < 18){afternoon.push({[item]:timeList[timeitem[0]][timeitem[1]][timeitem[2]][item]})}
            else {evening.push({[item]:timeList[timeitem[0]][timeitem[1]][timeitem[2]][item]})}
        })
    }

    const handleClick = (item:string)=>{
        if(typeof timeitem[3] === "number"){
            const newtimeitem = [...timeitem]
            newtimeitem[3] = Number(item)
            dispatch(setbookingListTime(newtimeitem))
        }
        else{
            dispatch(setbookingListTime([...timeitem,Number(item)]))
        }
    }

    return(
        <section className={styles.container}>
            <div className={styles.title}>預訂</div>
            <div className={styles.content}>
                <CheckList data={data} timeList={timeList}/>
                <Schedule timeList={timeList} chooseDay = {chooseDay} setChooseDay = {setChooseDay}/>
            </div>
            <div className={styles.hours}>
                {morning.length>0 && <div className={styles.hourList}>
                    <div className={styles.hourType}>上午</div>{morning.map((item,index)=>(
                        <div key={index} className={`${styles.hourItem} 
                        ${(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length) && styles.hourNo}
                        ${((typeof timeitem[3] === "number") && (timeitem[3] === Number(Object.keys(item)[0]))) && styles.choose}
                        `} onClick={(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length)?undefined:()=> handleClick(Object.keys(item)[0])}>{Number(Object.keys(item)[0])%1===0?`${Object.keys(item)[0]}:00`:`${Math.floor(Number(Object.keys(item)[0]))}:30`}</div>
                    ))}
                    </div>}
                {afternoon.length>0 && <div className={styles.hourList}>
                    <div className={styles.hourType}>下午</div>{afternoon.map((item,index)=>(
                        <div key={index} className={`${styles.hourItem} 
                        ${(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length) && styles.hourNo}
                        ${((typeof timeitem[3] === "number") && (timeitem[3] === Number(Object.keys(item)[0]))) && styles.choose}
                        `} onClick={(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length)?undefined:()=> handleClick(Object.keys(item)[0])}>{Number(Object.keys(item)[0])%1===0?`${Object.keys(item)[0]}:00`:`${Math.floor(Number(Object.keys(item)[0]))}:30`}</div>
                    ))}
                    </div>}
                {evening.length>0 && <div className={styles.hourList}>
                    <div className={styles.hourType}>晚間</div>{evening.map((item,index)=>(
                        <div key={index} className={`${styles.hourItem} 
                        ${(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length) && styles.hourNo}
                        ${((typeof timeitem[3] === "number") && (timeitem[3] === Number(Object.keys(item)[0]))) && styles.choose}
                        `} onClick={(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length)?undefined:()=> handleClick(Object.keys(item)[0])}>{Number(Object.keys(item)[0])%1===0?`${Object.keys(item)[0]}:00`:`${Math.floor(Number(Object.keys(item)[0]))}:30`}</div>
                    ))}
                    </div>}
                {night.length>0 && <div className={styles.hourList}>
                    <div className={styles.hourType}>夜間</div>{night.map((item,index)=>(
                        <div key={index} className={`${styles.hourItem} 
                        ${(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length) && styles.hourNo}
                        ${((typeof timeitem[3] === "number") && (timeitem[3] === Number(Object.keys(item)[0]))) && styles.choose}
                        `} onClick={(Object.keys(timeList[timeitem[0]][timeitem[1]][timeitem[2]][Object.keys(item)[0]]).length)?undefined:()=> handleClick(Object.keys(item)[0])}>{Number(Object.keys(item)[0])%1===0?`${Object.keys(item)[0]}:00`:`${Math.floor(Number(Object.keys(item)[0]))}:30`}</div>
                    ))}
                    </div>}
            </div>
        </section>
    )
}
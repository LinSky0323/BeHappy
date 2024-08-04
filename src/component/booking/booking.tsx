"use client"
import { useFormState } from "react-dom"
import SubmitButton from "../button/submitButton/submitButton"
import Schedule from "../schedule/schedule"
import styles from "./booking.module.css"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addbookingList, delbookingList, selectbookingList } from "@/lib/store/features/slices"


const CheckList = ()=>{
    const testData = [{item:"染髮",price:1000,time:1},{item:"洗髮",price:100,time:0.5},{item:"燙髮",price:0,time:0}]
    const submit = async(prevState:any, formData:FormData)=>{
       console.log(bookingList)
    }
    const [state,formAction] = useFormState(submit,null)
    const dispatch = useAppDispatch()
    const bookingList = useAppSelector(selectbookingList)
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
                        <label >{item["item"]}:{item["price"]}</label>
                    </div>
                ))}
                <div className={styles.time}>預估需要時間：{totalTime===-1?"視情況而定":`${totalTime}小時`}</div>
                <div className={styles.price}>預估總金額：{totalPrice===-1?"視情況而定":`${totalPrice}元`}</div>
                <div className={styles.btn}><SubmitButton name="預定"/></div>
            </form>
        </div>
    )
}

export default function Booking(){

    return(
        <section className={styles.container}>
            <div className={styles.title}>預訂</div>
            <CheckList/>
            <Schedule/>
        </section>
    )
}
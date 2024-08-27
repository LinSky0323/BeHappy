"use client"
import SubmitButton from "@/component/button/submitButton/submitButton"
import styles from "./page.module.css"
import { useFormState } from "react-dom"
import { SetStateAction, useEffect, useState } from "react"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { setProfile } from "@/lib/firebase/firestore"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import Image from "next/image"
import { UploadImg } from "@/lib/firebase/firestorage"

function createYear(){
    const date = new Date()
    let list = []
    const year = date.getFullYear()
    for(let i = 0;i<100;i++){
        list.push(year-i)
    }
    return list
}
const monthList = [1,2,3,4,5,6,7,8,9,10,11,12]
const dayList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

const HeadImg = ({imgUrl,setImgUrl}:{imgUrl:string,setImgUrl:React.Dispatch<SetStateAction<string>>})=>{
   
    const remind = useChangeRemind()
    const uid = localStorage.getItem("uid") as string
    const submit = async(prevState:any,formData:FormData)=>{
        const img = formData.get("headImg")
        let profileImage = "";
        console.log(img)
        if (img instanceof File){
            if(img.name!==""){
                profileImage = await UploadImg(img)
            }
            else{
                return
            }
        }
        else{
            return
        }
        
        const submitData = {profileImage}
        const res = await setProfile(uid,submitData) as string
        remind.setRemind(res)
    }
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files?.length){
            const file = event.target.files[0]
            if(file.type.startsWith("image/")){
                const reader = new FileReader()
                reader.onload = ()=>{
                    setImgUrl(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
        }
    }
    const [state,formAction] = useFormState(submit,null)
    return(
        <form className={styles.headImg} action={formAction}>
            <label htmlFor="headImg" className={styles.selectimg}>選擇檔案</label>
            <div className={styles.imgContainer}>
                {imgUrl ? <Image src={imgUrl} alt="預覽" fill style={{ objectFit: 'cover' }} sizes="100%" priority/>:<div className={styles.chooseimg}>未選擇照片</div>}
            </div>
            <input type="file" accept="image/*" style={{display:"none"}} name="headImg" id="headImg" onChange={handleChange}/>
            <div className={styles.imgbtn}>{remind.state && <div className={styles.remind}>{remind.state}</div>}<SubmitButton name="上傳"/></div>
        </form>
    )
}


export default function ProfileForm(){
    const uid = localStorage.getItem("uid") as string
    const [totalData,setTotalData] = useState<any>({})
    const [imgUrl,setImgUrl] = useState("")
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [sex,setSex] = useState("")
    const [year,setYear] = useState("")
    const [month,setMonth] = useState("1")
    const [day,setDay] = useState("1")
    const remind = useChangeRemind()

    const submit = async(prevState:any,formData:FormData)=>{
        const newList = {...totalData}
        newList["name"] = name
        newList["phone"] = phone
        newList["sex"] = sex
        newList["year"] = year
        newList["month"] = month
        newList["day"] = day
        const res =await  setProfile(uid,newList) as string
        remind.setRemind(res)
    }

    useEffect(()=>{
        const db = getFirestore()
        const ref = doc(db,uid,"profiledb")
        const unsubscribe = onSnapshot(ref,(message)=>{
            const result:any = message.data()
            if(result){
                setTotalData(result)
                setEmail(result["email"])
                setName(result["name"])
                setPhone(result["phone"])
                setSex(result["sex"])
                setYear(result["year"])
                setMonth(result["month"])
                setDay(result["day"])
                setImgUrl(result["profileImage"])
            }
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    const [state,formAction] = useFormState(submit,null)

    return(
        <div style={{display:"flex"}}>
            <form action={formAction} className={styles.form}>
                <div className={styles.container}><label className={styles.label}>信箱</label><span>{email}</span></div>
                <div className={styles.container}><label className={styles.label}>姓名</label><input className={styles.input} placeholder="請輸入您的姓名" value={name} onChange={(e)=>setName(e.target.value)}/></div>
                <div className={styles.container}><label className={styles.label}>手機號碼</label><input className={styles.input} placeholder="請輸入您的手機號碼" value={phone} onChange={(e)=>setPhone(e.target.value)}/></div>
                <div className={styles.container}><label className={styles.label}>性別</label>
                <input type="radio" name="sex" value="male" checked={sex==="male"} onChange={(e)=>setSex(e.target.value)}/><span className={styles.sex}>男生</span>
                <input type="radio" name="sex" value="female" checked={sex==="female"} onChange={(e)=>setSex(e.target.value)}/><span className={styles.sex}>女生</span>
                <input type="radio" name="sex" value="else" checked={sex==="else"} onChange={(e)=>setSex(e.target.value)}/><span className={styles.sex}>其他</span>
                </div>
                <div className={styles.container}><label className={styles.label}>生日</label>
                <select className={styles.select} name="year" value={year} onChange={(e)=>setYear(e.target.value)}>
                    {createYear().map((item,index)=>(
                        <option key={index} value={item}>{item}年</option>
                    ))}
                </select>
                <select className={styles.select} name="month" value={month} onChange={(e)=>setMonth(e.target.value)}>
                    {monthList.map((item,index)=>(
                        <option key={index} value={item}>{item}月</option>
                    ))}
                </select>
                <select className={styles.select} name="day" value={day} onChange={(e)=>setDay(e.target.value)}>
                    {dayList.map((item,index)=>(
                        <option key={index} value={item}>{item}日</option>
                    ))}
                </select>
                </div>
                <div className={styles.btn}>{remind.state && <div className={styles.remind}>{remind.state}</div>}<SubmitButton name="修改"/></div>
                
            </form>
            <HeadImg imgUrl = {imgUrl} setImgUrl = {setImgUrl}/>
        </div>
    )
}
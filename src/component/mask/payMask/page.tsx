"use client"
import FormTitle from "@/component/form/title"
import styles from "./page.module.css"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import { getProfile } from "@/lib/firebase/firestore"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"

const money = 300

export default function PayMask(){
    console.log(123)
    const uid = localStorage.getItem("uid") as string
    const card_number_ref = useRef<any>(null)
    const card_expiration_date_ref = useRef<any>(null)
    const card_ccv_ref = useRef<any>(null)
    const btnRef = useRef<any>(null)
    const [disable,setDisable] = useState(true)
    const [profile,setProfile] = useState<any>({})
    const remind = useChangeRemind()
    useEffect(()=>{
        
        if(window.TPDirect){
            window.TPDirect.setupSDK(process.env.NEXT_PUBLIC_APP_ID, process.env.NEXT_PUBLIC_APP_KEY, 'sandbox')
        }
        else{
            console.log("TAPPAY SDK ERROR")
            return
        }
        let field = {
            number: {
                // css selector
                element:card_number_ref.current ,
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                // DOM object
                element:card_expiration_date_ref.current,
                placeholder: 'MM / YY'
            },
            ccv: {
                element:card_ccv_ref.current ,
                placeholder: 'CVV'
            }
        }
            window.TPDirect.card.setup({
            fields:field,
            styles: {
                // Style all elements
                'input': {
                    'color':'rgba(255,255,255,1)',
                    'font-size':'16px',
                    'border':'1px',
                    'font-weight':'500',
                    'font-family': '"Noto Sans TC", sans-serif'
                },
                
                // style valid state
                '.valid': {
                    'color': 'green'
                },
                // style invalid state
                '.invalid': {
                    'color': 'red'
                }
            },
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
                beginIndex: 6, 
                endIndex: 11
            }
        })
    },[])
    useEffect(()=>{
        getProfile(uid).then((res)=>setProfile(res))
    },[])
    window.TPDirect.card.onUpdate(function(update:any){
        if(update.canGetPrime){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
    })
    const pay = async()=>{
        const tappayStatus = window.TPDirect.card.getTappayFieldsStatus()
        if (tappayStatus.canGetPrime === false) {
            remind.setRemind("請輸入正確的信用卡資訊")
            return
        }

        window.TPDirect.card.getPrime((result:any) => {
            if (result.status !== 0) {
                remind.setRemind('get prime error ' + result.msg)
                return
            }
            fetch("/api/pay",{
                method:"POST",
                body:JSON.stringify({
                    "prime":result.card.prime,
                    "order":{
                        name:profile.name,
                        email:profile.email,
                        phone:profile.phone,
                        price:money,
                        uid:uid
                    }
                  })}).then((i:any)=>{
                    if(i.ok){
                        return i.text()
                    }}).then((result)=>{
                        console.log(result)
                    })
        })
    }
    const [state,formAction] = useFormState(pay,null)
    return(
        <div className={styles.mask}>
            <div className={styles.container} >
                <div>付費升級會員</div>
                
                <form className={styles.form} action={formAction}>
                    <div className={styles.item}><div className={styles.label}>卡片號碼：</div><div className={`tpfield ${styles.input}`} id="card-number" ref={card_number_ref}></div></div>
                    <div className={styles.item}><div className={styles.label}>過期時間：</div><div className={`tpfield ${styles.input}`} id="card-expiration-date" ref={card_expiration_date_ref}></div></div>
                    <div className={styles.item}><div className={styles.label}>驗證密碼：</div><div className={`tpfield ${styles.input}`} id="card-ccv" ref={card_ccv_ref}></div></div>
                    <button className={styles.btn} disabled={disable} ref={btnRef}>付款</button>
                    {remind.state && <div className={styles.remind}>{remind.state}</div>}
                </form>
            </div>
        </div>
    )
}
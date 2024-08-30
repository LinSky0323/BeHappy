"use client"
import { useFormState, useFormStatus } from "react-dom"
import SubmitButton from "../../button/submitButton/submitButton"
import styles from "./page.module.css"
import { useState } from "react"
import { loginAuth, logoutAuth, sendEmailAuth, signAuth } from "@/lib/firebase/firaAuth"
import { StopPropogation } from "@/lib/stopPropagation"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { usePathname, useRouter } from "next/navigation"
import { checkLevel, setProfile } from "@/lib/firebase/firestore"
import Image from "next/image"





const sign = async(prevState:any, formData:FormData,remind: any,setSl:React.Dispatch<React.SetStateAction<string>>,setIsLogin:React.Dispatch<React.SetStateAction<number>>,setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,isLogin:number,path:string,router:any,setIsReg:React.Dispatch<React.SetStateAction<boolean>>)=>{
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    if(name && email && password){
        try{
            const res = await signAuth(name,email,password) as any
            await setProfile(res.uid,{
                email:email,
                name:name,
                level:0,
            })
            console.log("註冊成功")
            setSl("註冊成功！請至信箱進行驗證")
            setTimeout(()=>{
                    setIsReg(false)
                    setSl("")
            },2000)
        }
        catch(error:any){
            console.log(error)
            if(error.message.includes("email-already-in-use")){
                remind.setRemind("email已註冊過")
            }
            else if(error.message.includes("least 6 characters")){
                remind.setRemind("密碼最少需要6個字")
            }
        }
    }
    else{
        remind.setRemind("有資料尚未輸入")
    }
}
const login = async(prevState:any, formData:FormData,remind: any,setSl:React.Dispatch<React.SetStateAction<string>>,setIsLogin:React.Dispatch<React.SetStateAction<number>>,setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,isLogin:number,path:string,router:any)=>{
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    if(email && password){
        try{
            const res  = await loginAuth(email,password) as any
            localStorage.setItem("uid",res.uid)
            const level = await checkLevel(res.uid) as string
            localStorage.setItem("level",level)
            const p = path.split('/')
            setSl("登入成功")
            setTimeout(()=>{
                    setSlwindow(false)
                    setSl("")
                    setIsLogin(1)
                    if(!p[1]){
                        router.push(path+"user/"+localStorage.getItem("uid"))
                    }
            },2000)
        }
        catch(error){
            if(error==="登入失敗"){
                remind.setRemind(error)
            }
            else if (error==="信箱尚未驗證"){
                setSl(error)
            }
            
        }
       
    }
    else{
        remind.setRemind("有資料尚未輸入")
        
    }
}
const logout = async(prevState:any, formData:FormData,setOut:React.Dispatch<React.SetStateAction<string>>,remind:any,setIsLogin:React.Dispatch<React.SetStateAction<number>>,setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,isLogin:number,path:string,router:any)=>{
    
    try{
        const res = await logoutAuth() as string
        setOut(res)
        localStorage.removeItem("uid")
        localStorage.removeItem("level")
        sessionStorage.removeItem("identity")
        setTimeout(()=>{
                setIsLogin(2)
                setSlwindow(false)
                setOut("")
                if(path.includes("user")){
                    router.push("/")
                }
            
        },2000)

    }
    catch(error){
        console.log(error)
        remind.setRemind("登出出錯")
    }
}

function SubmitBtn({name}:{name:string}){
    const {pending} = useFormStatus()

    return(
        <button type="submit" aria-disabled={pending} className={styles.btn}>
            {name}
        </button>
    )
}

const X = ({setSlwindow,setSl,setOut}:{setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,setSl?:React.Dispatch<React.SetStateAction<string>>,setOut?:React.Dispatch<React.SetStateAction<string>>})=>{
    const handleClick = ()=>{
        setSlwindow(false)
        if(setSl){setSl("")}
        if(setOut){setOut("")}
    }
    return(
        <div className={styles.x} onClick={handleClick}>X</div>
    )
}

const SLWindow = ({setSlwindow,slOK,setSl,setIsLogin,isLogin}:{setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,slOK:string,setSl:React.Dispatch<React.SetStateAction<string>>,setIsLogin:React.Dispatch<React.SetStateAction<number>>,isLogin:number})=>{
    const path = usePathname()
    const router = useRouter()
    const [signstate,signAction] = useFormState((prevState:any, formData:any)=>sign(prevState, formData,remind,setSl,setIsLogin,setSlwindow,isLogin,path,router,setIsReg), null)
    const [loginstate,loginAction] = useFormState((prevState:any, formData:any)=>login(prevState, formData,remind,setSl,setIsLogin,setSlwindow,isLogin,path,router), null)
    const [isReg,setIsReg] = useState(false)
    const remind = useChangeRemind()

    const clickSign = ()=>{
        setIsReg(true)
    }
    const clickLogin = ()=>{
        setIsReg(false)
    }
  

    const clickOK = ()=>{
        if(isReg){
            setIsReg(false)
            setSl("")
        }
        else{
            setSlwindow(false)
            setSl("")
            setIsLogin(1)
        }

    }
    const clickToUser = ()=>{
        setSlwindow(false)
        setSl("")
        setIsLogin(1)
        router.push(path+"user/"+localStorage.getItem("uid"))
    }
    const cliclToLogin = ()=>{
        setIsReg(false)
        setSl("")
    }
    const sendEmail = async()=>{
        const res = await sendEmailAuth() as string
        remind.setRemind(res)
    }
    return(
        <div className={styles.window} onClick={(e)=>StopPropogation(e)}>
            <div className={styles.back}>
                <Image src = {slOK?"/backnopeople.png":"/signback.png"} alt="背景" fill  sizes="340px" priority/>
            </div>
            <div className={styles.content}>
            <div className={styles.top}><X setSlwindow = {setSlwindow} setSl = {setSl}/></div>
            {slOK?
            <>
            <div className={styles.title1}> 
                {slOK}
            </div>
            {slOK==="信箱尚未驗證"?
            <button className={styles.btn} onClick = {sendEmail}>重發驗證信</button>:
            <button className={styles.btn} onClick = {isReg?cliclToLogin:(!path.split('/')[1]?clickToUser:clickOK)}>{isReg?"返回登入頁":`${!path.split('/')[1]?"跳轉到會員頁":"返回上一個頁面"}`}</button>}
            <div className={styles.remind}>{remind.state}</div>
            </>:
            <>
            <div className={styles.title}>{isReg?"Sign up":"Login"}</div>
            <form className={styles.form} action={isReg?signAction:loginAction}>
                {isReg && <input className={styles.input} placeholder="輸入使用者名稱" name="name" type="text"/> }
                <input className={styles.input} placeholder="電子郵件" name="email" type="email"/>
                <input className={styles.input} placeholder="密碼" name="password" type="password"/>
                <SubmitBtn name={isReg?"註冊":"登入"}/>
                <div className={styles.remind}>{remind.state}</div>
            </form>
            <div className={styles.bottom}>
                {isReg?<><span>已有帳號 </span>   
                <span className={styles.clickSign} onClick={clickLogin}>登入</span></>:<><span>加入會員 </span>   
                <span className={styles.clickSign} onClick={clickSign}>註冊</span></>}
            </div>
            </>}
            </div>
        </div>
    )
}

    const LogoutWindow = ({setSlwindow,outOK,setOut,setIsLogin,isLogin}:{setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,outOK:string,setOut:React.Dispatch<React.SetStateAction<string>>,setIsLogin:React.Dispatch<React.SetStateAction<number>>,isLogin:number})=>{
        const path = usePathname()
        const router = useRouter()
        const [state,formAction] = useFormState((prevState:any, formData:any)=>logout(prevState, formData,setOut,remind,setIsLogin,setSlwindow,isLogin,path,router), null)
        const remind = useChangeRemind()
        const clickOut = ()=>{
            setSlwindow(false)
            setOut("")
            setIsLogin(2)
            if(path.includes("user")){
                router.push("/")
            }
        }
        return(
            <div className={styles.window} onClick={(e)=>StopPropogation(e)}>
                <div className={styles.back}>
                    <Image src = {outOK?"/backnopeople.png":"/signback.png"} alt="背景" fill sizes="340px" priority/>
                </div>
                <div className={styles.content}>
                <div className={styles.top}><X setSlwindow = {setSlwindow} setOut = {setOut}/></div>

                {outOK?
                <>
                <div className={styles.title1}> 
                    {outOK}
                </div>
                <button className={styles.btn} onClick = {clickOut}>{path.includes("user")?"返回首頁":"返回剛才的頁面"}</button>
                </>:
                <>
                <div className={styles.title1}>確定要登出嗎?</div>
                <form className={styles.form} action={formAction}>
                    <SubmitBtn name="登出"/>
                </form>
                <div className={styles.remind}>{remind.state}</div>
                </>}
                

                </div>
                <div className={styles.bottom}>
                </div>
            </div>
        )
    }

    export default function SL({isLogin,setSlwindow,setIsLogin}:{isLogin:number,setSlwindow:React.Dispatch<React.SetStateAction<boolean>>,setIsLogin:React.Dispatch<React.SetStateAction<number>>}){
        const [slOK,setSl] = useState("")
        const [outOK,setOut] = useState("")
        const handleClick = ()=>{
            setSl("")
            setOut("")
            setSlwindow(false)
        }
        return(
            <div className={styles.mask} onClick={handleClick}>
                {isLogin===1?<LogoutWindow setSlwindow = {setSlwindow} outOK = {outOK} setOut = {setOut} setIsLogin = {setIsLogin} isLogin = {isLogin}/>:<SLWindow setSlwindow = {setSlwindow} slOK = {slOK} setSl = {setSl} setIsLogin = {setIsLogin} isLogin = {isLogin}/>}
            </div>
        )
    }
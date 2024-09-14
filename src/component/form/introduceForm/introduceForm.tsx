"use client"
import { useFormState } from "react-dom"
import styles from "./introduceForm.module.css"
import SubmitButton from "@/component/button/submitButton/submitButton"
import { UploadImg } from "@/lib/firebase/firestorage"
import { createListData, getListData } from "@/lib/firebase/firestore"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useChangeValue } from "@/lib/hook/useChangeValue"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { LastButton } from "@/component/button/lastButton/page"
import { NextButton } from "@/component/button/nextButton/page"



export default function IntroduceForm(){
    const buildList = useUserBuildSelector(selectBuildList)
    const [imageiswrite,setImage] = useState(true)
    const [contentiswrite,setContent] = useState(true)
    const [imageUrl,setImageUrl] = useState("")
    const textinput = useChangeValue("")
    const imageRemind = useChangeRemind()
    const contentRemind = useChangeRemind()
    const uid = localStorage.getItem("uid") as string
    const dispatch = useUserBuildDispatch()
    useEffect(()=>{
        if(!buildList?.introduceContent?.length || !buildList.introduceImage){
            getListData(uid).then((item)=>{
                if(item){
                    dispatch(setBuildList(item))
                    let content = ""
                    const list = item?.introduceContent??[]
                    for(let i of list){
                        if(list.indexOf(i)===0){
                            content += i
                        }
                        else{
                            content = content+"\n"+i;
                        }
                    }
                    textinput.setValue(content)
                    setImageUrl(item.introduceImage)
                    if(item.introduceImage){
                        setImage(false)
                    }
                    if(item.introduceContent && item.introduceContent[0]){
                        setContent(false)
                    }
                }
            })
        }
        if(buildList.introduceImage){
            setImageUrl(buildList.introduceImage)
            setImage(false)
        }
        if(buildList?.introduceContent?.length){
            let content = ""
            const introduceContent = buildList?.introduceContent ?? []
            for(let i of introduceContent){
                if(introduceContent.indexOf(i)===0){
                    content += i
                }
                else{
                    content = content+"\n"+i;
                }
            }
            textinput.setValue(content)
            setContent(false)
        }
    },[])

    const imageSubmit = async(prevState:any, formData:FormData)=>{    
        const img = formData.get("introduceImage")
        let introduceImage = "";
        if (img instanceof File){
            if(img.name){
                introduceImage = await UploadImg(img)
            }
        }
        
        const submitData = {introduceImage}
        const res = await createListData(uid,submitData) as string
        imageRemind.setRemind(res)
        setImage(false)
    }
    const contentSubmit = async(prevState:any, formData:FormData)=>{
        const content = formData.get("introduceContent")
        let introduceContent:any = []
        if(content && typeof content === 'string'){
            introduceContent = content.split("\n")
        }
        const submitData = {introduceContent}
        const res = await createListData(uid,submitData) as string
        contentRemind.setRemind(res)
        setContent(false)
    }
    const [imagestate,imageAction] = useFormState(imageSubmit,null)
    const [contentstate,contentAction] = useFormState(contentSubmit,null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files?.length){
            const file = event.target.files[0]
            if(file.type.startsWith("image/")){
                const reader = new FileReader();
                reader.onloadend = () =>{
                    setImageUrl(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
        }
    }
    const imageUse = ()=>{
        setImage(true)
    }
    const contentUse = ()=>{
        setContent(true)
    }

    return(
        <>
        <form className={styles.form} action={imageiswrite?imageAction:imageUse}>
            <label>自介圖片：</label>
            <input type="file" name="introduceImage" id="imageInput" onChange={handleChange} disabled={!imageiswrite}  style={{display:"none"}} accept="image/*"></input>
            <div className={styles.card}>
            <label htmlFor="imageInput" className={styles.selectFile}>選擇檔案</label>
            {(!imageUrl) ?<div className={styles.filename}>未選擇圖片</div>:
            <div className={styles.image}><Image src={imageUrl} alt="預覽圖"  fill  sizes="100%" style={{ objectFit: 'cover' }}/></div> }
            </div>
            <div className={styles.btn1}><SubmitButton name={imageiswrite?"送出":"修改"}/></div>
            {imageRemind.state && <div className={styles.remind}>{imageRemind.state}</div>}
        </form>
        <form className={styles.form} action={contentiswrite?contentAction:contentUse}>
            <label>簡介內容：</label>
            <textarea name="introduceContent" rows={8} cols={30} className={styles.textarea} 
            value={textinput.value} onChange={textinput.onTextCgange} disabled={!contentiswrite}></textarea>
            <div className={styles.btn2}><SubmitButton name={contentiswrite?"送出":"修改"}/></div>
            
            {contentRemind.state && <div className={styles.remind}>{contentRemind.state}</div>}
        </form>
        </>
    )
}